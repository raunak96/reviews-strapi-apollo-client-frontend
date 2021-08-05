# NextJs + Apollo Client + Strapi CMS

- [Apollo Client](https://www.apollographql.com/client/) is a GraphQL client that allows you to easily query the exact data you need from a **GraphQL server** - which is provided as plugin in Strapi which was installed there and on running the backend starts at `http://localhost:1337/graphql`.

- This app use the **NextJS Apollo Starter** used to integrate Apollo seamlessly with [Next.js data fetching methods](https://nextjs.org/docs/basic-features/data-fetching) to fetch queries in the server and hydrate them in the browser.


- To execute the starter do the following:
```bash
npx create-next-app -e with-apollo project-name
# or
yarn create next-app -e with-apollo project-name
```

The **strapi backend** can be found [here](https://github.com/raunak96/reviews-strapi-apollo-client-backend).
