import { useAppSelector } from "@/controller/hooks";
import { GeneratedImages } from "./GeneratedImages";

export const AllImages = () => {
    const { images } = useAppSelector(state => state.image);
    return (
        <>
            {
                (images.length > 0) && images.map((i, index) => <GeneratedImages key={`img-list-${index}`} image={i.image} />)
            }
        </>
    )
}