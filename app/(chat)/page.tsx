import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'

export default function IndexPage() {
  const id = nanoid()
  console.log('id:', id)
  console.log(new Date().toISOString())
  console.log("hi there");

  return (<>
    <h1>Hi there</h1>
    <Chat id={id} />
  </>
  )
}
