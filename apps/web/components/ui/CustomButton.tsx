import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CustomButtonProps {
    text: string,
    icon?: string,
    style?: string,
    onClick?: () => void
}


const CustomButton: React.FC<CustomButtonProps> = ({ text, icon, style, onClick }) => {
    const image = icon ? <Image src={icon} alt="Run icon" width={14} height={14} /> : <></>
    return (
        <Button onClick={onClick} className={style}>{text}{image}</Button>

    )
}

export default CustomButton
