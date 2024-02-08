import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import 'swiper/css';
import './Intro.css';
import sample1 from '../assets/sample/cow.png';
import sample2 from '../assets/sample/pig.png';
import sample3 from '../assets/sample/fox.png';

interface ContainerProps{
    onFinish: () => void;
}

const SwiperButtonNext = ({ children } : any) => {
    const swiper = useSwiper();
    return (
    <IonButton onClick = {() => swiper.slideNext()}>
        {children}
    </IonButton>)
}

const Intro: React.FC<ContainerProps> = ({onFinish}) => {
    return (
        <Swiper>
            <SwiperSlide>
                <img src={sample1} alt="Intro 1" />
                <IonText>
                    <h3>Test message!</h3>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <img src={sample2} alt="Intro 2" />
                <IonText>
                    <h3>Test message!</h3>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <img src={sample3} alt="Intro 3" />
                <IonText>
                    <h3>Test message!</h3>
                </IonText>
                <IonButton onClick = {() => onFinish()}>Finish</IonButton>
            </SwiperSlide>
        </Swiper>
    );
};

export default Intro;