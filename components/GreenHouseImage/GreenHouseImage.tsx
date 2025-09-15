import Image from 'next/image'
import styles from './GreenHouseImage.module.css' // Asegúrate de crear este archivo CSS
import { Thermometer, Droplet, MapPin } from 'lucide-react';




export function GreenHouseImage() {
    return (
        <div className={styles.imageContainer} >
            <Image src="/greenhouse.png" alt="Green House" height={400} width={400} objectFit="contain" />
            <div className={`${styles.pin} dark:bg-[#020817]`} style={{ top: '20%', left: '25%' }}>
                <Thermometer />
            </div>
            <div className={`${styles.pin} dark:bg-[#020817]`} style={{ top: '40%', left: '25%' }}>
                <Droplet />
            </div>
            <div className={`${styles.pin} dark:bg-[#020817]`} style={{ top: '10%', left: '60%' }}>
                <MapPin />
            </div>
       
        </div>
    )
}