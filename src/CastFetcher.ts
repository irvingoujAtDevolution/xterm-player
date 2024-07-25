import { ICastObject } from './Cast'
import { parse } from './CastParser'

export type SourceProvider = () => Promise<{
  text: () => Promise<string>
}>

async function innerFetchCast(url: string, sourceProvider: SourceProvider | null): Promise<ICastObject> {
  const res = sourceProvider ? await sourceProvider() : await fetch(url)
  return parse(await res.text())
}

export default function fetchCast(url: string, sourceProvier:SourceProvider | null): Promise<ICastObject> {
  return innerFetchCast(url,sourceProvier)
}
