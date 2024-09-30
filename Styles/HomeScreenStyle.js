import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerView: {
        flex: 1,
    },

    line: {
        alignSelf: "center",
        borderRadius: 12,
        width: "70%",
        height: 2,
        backgroundColor: '#8B322C',
    },

    header: {
        borderRadius: 8,
        fontSize: 34,
        color: "#FFC470",
        flex: 1,
        textAlign: "center",
        marginTop: "3.5%",
        backgroundColor: "#8B322C"
    },

    topItems: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        height: "37%",
        width: "100%",
    },

    batteryBar: {
        backgroundColor: "#FFC470",
        height: "90%",
        width: "45%",
        borderRadius: 24,
        marginLeft: "3%",
        marginTop: "3%",
        marginRight: "4%"
    },

    chargingSubItems: {
        fontSize: 18,
        marginLeft: "8%",
    },

    section2: {
        backgroundColor: '#FFC470',
        width: "45%",
        height: "90%",
        borderRadius: 24,
        marginTop: "3%",
    },


    ortaBaslik: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#8B322C",
        textAlign: "center",
        width: "100%",
        padding: 0,
        margin: 0,
        marginTop: 8
    },

    batteryBrand: {
        padding: 10,
        fontSize: 18,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    section3: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: "94%",
        height: "12%",
        backgroundColor: "#FFC470",
        marginLeft: "3%",
        borderRadius: 12,
        marginTop: "1%"
    },

    settingsHeader: {
        fontSize: 24,
        color: "#8B322C",
        textAlign: 'center',
        width: "100%",
        marginTop: "2%",
        fontWeight: "bold"
    },


    degrees: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#8B322C",
        textAlign: "center",
        width: "100%",
        marginTop: "2%",
    },

    threeItems: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "94%",
        height: "14%",
        marginLeft: "3%",
        marginTop: "1%",
    },

    subFour1: {
        height: "90%",
        width: "24%",
        backgroundColor: "#FFC470",
        flexDirection: "col",
        borderRadius: 12
    },

    subFour2: {
        height: "90%",
        width: "24%",
        backgroundColor: "#FFC470",
        flexDirection: "col",
        borderRadius: 12
    },

    subFour3: {
        flexDirection: "col",
        height: "90%",
        width: "24%",
        backgroundColor: "#FFC470",
        borderRadius: 12
    },

    subFour4: {
        flexDirection: "col",
        height: "90%",
        width: "24%",
        backgroundColor: "#FFC470",
        borderRadius: 12
    },


    subThree1: {
        height: "90%",
        width: "32%",
        backgroundColor: "#FFC470",
        flexDirection: "col",
        borderRadius: 12
    },

    subThree2: {
        height: "90%",
        width: "32%",
        backgroundColor: "#FFC470",
        flexDirection: "col",
        borderRadius: 12
    },

    subThree3: {
        flexDirection: "col",
        height: "90%",
        width: "32%",
        backgroundColor: "#FFC470",
        borderRadius: 12,
    },

    batteryValue: {
        fontSize: 30,
        textAlign: "center"
    },

    shadowProperties: {
        elevation: 5,         // gölge efekti
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },

    sectionBottom: {
        flexDirection: "row",
        width: "94%",
        height: "24%",
        backgroundColor: "purple",
        marginLeft: "3%",
        borderRadius: 12,
        marginTop: "3%"
    },

    aText: {
        fontSize: 20,
        color: "black",
        textAlign: "center",
        width: "100%",
        marginTop: "2%",
    },


    settingsButtonsView: {
        alignItems: "center",
        marginTop: "8%"
    },

    settingsButton: {
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 8,
        width: "90%",
        borderColor: "#000",
        backgroundColor: "#4793AF",
        marginBottom: "8%"
    },

    settingsButtonText: {
        padding: "3%",
        fontSize: 20,
        alignItems: "center",
    },

    poweredBy: {
        textAlign: "center",
        justifyContent: "center",
        margin: 0,
        paddingBottom: 8,
        fontSize: 12
    }
})

export default styles;