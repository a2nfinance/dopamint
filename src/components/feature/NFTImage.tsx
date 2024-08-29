import { Image } from "antd";
import { motion } from "framer-motion";
const whileHoverSettings = { scale: 1, rotate: 360, opacity: 0.8 };
const whileTapSettings = {
    scale: 0.8,
    // rotate: -90,
    borderRadius: "100%"
}
export const NFTImage = ({ src }: { src: string }) => {
    return (
        <motion.div
            whileHover={whileHoverSettings}
            whileTap={whileTapSettings}
        >
            <Image src={src} className="feature-logo" preview={true} />
        </motion.div>
    )
}