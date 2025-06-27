import SingleTaskContainer from './_components/SingleTaskContainer'
export default async function SingleTaskPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params
  console.log(taskId)
  return (
    <div>
      <SingleTaskContainer taskId={taskId} />
    </div>
  )
}
