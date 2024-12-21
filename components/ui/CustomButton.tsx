import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CustomButtonProps {
    text: string,
    icon?: string,
    style?: string,
}


const CustomButton: React.FC<CustomButtonProps> = ({ text, icon, style }) => {
    const image = icon ? <Image src={icon} alt="Run icon" width={14} height={14} /> : <></>
    return (
        <Button className={style} variant="outline">{text}{image}</Button>

    )
}

export default CustomButton
