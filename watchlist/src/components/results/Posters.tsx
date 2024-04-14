import EmptyPoster from "./EmptyPoster"
import Poster from "./Poster"

export default function Posters(results): JSX.Element[] {
    const posters = results.map(result=> {
                        // const {id, media_type, name, original_name, original_title, title, poster_path} = result
                        result.poster_path ? <Poster {...result} /> : <EmptyPoster {...result} />
                    }
}