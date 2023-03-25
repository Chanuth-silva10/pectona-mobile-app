import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { colors } from '../../globals/style'

const AnimationSlider = () => {
    return (
        <View>
            <View style={styles.animationSlider}>
                <Swiper autoplay={true} autoplayTimeout={5} showsButtons={true}
                    dotColor={colors.text2} activeDotColor={colors.text1}
                    nextButton={<Text style={styles.buttonText}>›</Text>}
                    prevButton={<Text style={styles.buttonText}>‹</Text>}
                >

                    <View style={styles.slide}>
                        <Image source={require('../../../assets/AnimationSliderImages/img1.png')} style={styles.image} />
                    </View>
                    <View style={styles.slide}>
                        <Image source={require('../../../assets/AnimationSliderImages/img2.png')} style={styles.image} />
                    </View>
                    <View style={styles.slide}>
                        <Image source={require('../../../assets/AnimationSliderImages/img3.png')} style={styles.image} />
                    </View>
                </Swiper>
            </View>
        </View>
    )
}

export default AnimationSlider

const styles = StyleSheet.create({
    animationSlider: {
        width: '100%',
        height: 200,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    slide: {
        width: '100%',
        height: 200,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    buttonText: {
        color: colors.text1,
        fontSize: 40,
        fontWeight: '500',
        backgroundColor: 'white',
        borderRadius: 20,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
    }
})