import { Hono } from 'hono'
import type { FC } from 'hono/jsx'

export const web = new Hono()

const Layout: FC = (props) => {
  return (
    <html lang="en">
      {/* @ts-ignore */}
      {import.meta.env.PROD ? (
        <script type='module' src='/static/client.js' />
      ) : (
        <script type='module' src='/src/client/index.tsx' />
      )}
      <body><div id="root" />{props.children}</body>
    </html>
  )
}

const Top: FC<{ messages: Array<string> }> = (props: {
  messages: Array<string>
}) => {
  return (
    <div>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li key={message}>{message}!!?</li>
        })}
      </ul>
    </div>
  )
}

web.get('/', (context) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']

  return context.html(
    <Layout>
      <Top messages={messages} />
    </Layout>
  )
})

