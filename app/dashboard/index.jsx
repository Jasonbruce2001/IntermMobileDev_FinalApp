import { View, Text, StyleSheet } from "react-native";

const DashboardScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
        </View>
    )
}

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
    }
})