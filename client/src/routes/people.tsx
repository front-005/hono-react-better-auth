import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { hc } from 'hono/client'
import { type AppType } from '../../../server/index'

const client = hc<AppType>('/')

const pepoleQueryOptions = queryOptions({
    queryKey: ['people'],
    queryFn: async () => {
        const response = await client.api.people.$get()
        return response.json()
    }
})

export const Route = createFileRoute('/people')({
    loader: ({ context: { queryClient } }) => {
        return queryClient.ensureQueryData(pepoleQueryOptions)
    },
    component: RouteComponent,
})

function RouteComponent() {

    const data = Route.useLoaderData()

    return <ul>
        {data.map(item => <li key={item.id}>
            {item.name}
        </li>)}
    </ul>
}
