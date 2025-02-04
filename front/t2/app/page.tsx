import DataFetchForm from "./components/DataFetchForm"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Prediction House prices</h1>
      <DataFetchForm />
    </main>
  )
}

