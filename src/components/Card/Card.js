import { Surface, Text } from "@react-native-material/core";
import { View } from "react-native"
import { styles } from "./CardStyles";

export default function Card(props) {
    return (
        <Surface
            elevation={2}
            category="medium"
            style={styles.containerStyles}
        >
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.children}>
                {props.children}
            </View>
            
        </Surface>
    )
}