import { useMount } from '@lilib/hooks';
import type { LoaderArgs } from '@remix-run/node';
import { Response } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useCatch, useLoaderData, useParams } from '@remix-run/react';
import { gql } from 'graphql-request';
import Tabulator from 'tabulator-tables';
import toPowerRankingTable from '~/common/adapters/toPowerRankingTable';
import type { EventModel } from '~/common/types/EventModel';
import { client } from '~/lib/graphql-client';

const getTournamentEntrants = (tournamentName = 'def-s-dojo-winter-chronicle-2023') => gql`
  query {
    tournament(slug: "${tournamentName}") {
      id
      name
      events {
        ##id
        ##name
        ##competitionTier
        numEntrants
        ##slug
      }
    }
  }
`;

const getTournament = (maxQueryLength: number, tournamentName = 'def-s-dojo-winter-chronicle-2023') => gql`
  {
    tournament(slug: "${tournamentName}") {
      id
      name
      events {
        ##id
        ##name
        ##competitionTier
        numEntrants
        ##slug
        standings(query: { page: 1, perPage: ${maxQueryLength} }) {
          nodes {
            placement
            entrant {
              ## id
              ##name
              ##initialSeedNum
              participants {
                ##id
                gamerTag
                player {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

const getMaxQueryLength = (numOfStandings: number) =>
  Math.floor(Math.exp(4.73395278) * Math.exp(-0.00138475911 * numOfStandings));

export const loader = async ({ params, request }: LoaderArgs) => {
  const getNumStandings = async () => {
    const response = await client.request(getTournamentEntrants(params.tournamentName ?? ''));
    const { tournament } = JSON.parse(JSON.stringify(response));
    const nonEmptyEvents: EventModel[] = tournament.events.filter((item: EventModel) => item.numEntrants !== 0);
    return nonEmptyEvents.reduce((acc, curr) => acc + curr.numEntrants, 0);
  };

  try {
    const numOfStandings = await getNumStandings();
    if (numOfStandings > 3400) {
      throw new Response('The number of standings for this tournament is too great to render a power ranking table', {
        status: 503,
      });
    }
    const maxQueryLength = getMaxQueryLength(numOfStandings);
    console.log(maxQueryLength);
    const response = await client.request(getTournament(maxQueryLength, params.tournamentName));
    const { tournament } = JSON.parse(JSON.stringify(response));
    const nonEmptyEvents = tournament.events.filter((item: EventModel) => item.numEntrants !== 0);
    const vm = toPowerRankingTable(nonEmptyEvents);
    return json({ vm });
  } catch {
    throw new Response('Error loading data', { status: 404 });
  }
};

export const ErrorBoundary = () => {
  const { tournamentName } = useParams();
  return (
    <div className="error-container">
      {`There was an error loading power the ranking table by the name id ${tournamentName}. Sorry.`}
    </div>
  );
};

export const CatchBoundary = () => {
  const { status, statusText } = useCatch();
  const params = useParams();
  if (status === 400) return <div className="error-container">What you're trying to do is not allowed.</div>;
  if (status === 403) return <div className="error-container">Sorry, but {params.jokeId} is not your joke.</div>;
  if (status === 404) return <div className="error-container">Huh? What the heck is "{params.tournamentName}"?</div>;
  if (status === 503) return <div className="error-container">{statusText}"?</div>;
  throw new Error(`Unhandled error: ${status}`);
};

const TableRoute = () => {
  const data = useLoaderData<typeof loader>();

  useMount(() => {
    new Tabulator('#example-table', {
      data: data.vm,
      layout: 'fitColumns',
      columns: [
        { title: 'Position', field: 'position', width: 100 },
        { title: 'Power Ranking', field: 'powerRanking', width: 150 },
        { title: 'Gamer Tag', field: 'gamerTag' },
      ],
    });
  });

  return (
    <>
      <nav>
        <ul>
          <li>
            <a
              href="https://www.start.gg/tournament/def-s-dojo-winter-chronicle-2023/events"
              target="_blank"
              rel="noreferrer"
            >
              Def's Dojo Winter Chronicle 2023
            </a>
          </li>
        </ul>
      </nav>{' '}
      <div id="example-table" />
    </>
  );
};

export default TableRoute;
