import { Button, StyleSheet, Text, View, NativeModules, Alert, Touchable, TouchableOpacity, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import styles from '../Styles/HomeScreenStyle'


const MyRootModule = NativeModules.MyRootModule;

const handleButtonClick = async (command, param2 = "default") => {
    try {
        const output = await MyRootModule.runCommand(command);
        if (param2 == "alert") {
            Alert.alert("Original Info", output)
        }
        return output
    } catch (error) {
        console.error('An error occurred while running the command:', error);
    }

};


export default function HomeScreen() {

    const [voltageNow, setVoltageNow] = useState(<Progress.Circle size={40} indeterminate={true} />);
    const [voltageMax, setVoltageMax] = useState(<Progress.Circle size={40} indeterminate={true} />);
    const [voltageAvg, setVoltageAvg] = useState(<Progress.Circle size={40} indeterminate={true} />);
    const [voltageMin, setVoltageMin] = useState(<Progress.Circle size={40} indeterminate={true} />)

    const [currentNow, setCurrentNow] = useState(<Progress.Circle size={40} indeterminate={true} />);
    const [currentAvg, setCurrentAvg] = useState(<Progress.Circle size={40} indeterminate={true} />);
    const [currentLimit, setCurrentLimit] = useState(<Progress.Circle size={40} indeterminate={true} />);

    const [isCharging, setIsCharging] = useState(<Progress.Circle size={32} indeterminate={true} />);
    const [acOrUsb, setAcOrUsb] = useState(<Progress.Circle size={12} indeterminate={true} />)

    const [chargeLevel, setChargeLevel] = useState(<Progress.Circle size={12} indeterminate={true} />);
    const [cycleCount, setCycleCount] = useState(<Progress.Circle size={12} indeterminate={true} />);
    const [batteryHealth, setBatteryHealth] = useState(<Progress.Circle size={12} indeterminate={true} />);
    const [technology, setTechnology] = useState(<Progress.Circle size={12} indeterminate={true} />);

    const [temperature, setTemperature] = useState(<Progress.Circle size={12} indeterminate={true} />);
    const [maxTemperature, setMaxTemperature] = useState(<Progress.Circle size={12} indeterminate={true} />);
    const [batteryType, setBatteryType] = useState(<View style={{ flex: 1, alignItems: "center" }}><Progress.Bar style={{ width: "90%", backgroundColor: "green" }} indeterminate={true} /></View>);

    const [isRooted, setIsRooted] = useState(true);
    const [onlyOne, setOnlyOne] = useState(true);
    const [isChargingPrevious, setIsChargingPrevious] = useState("");



    const fetchAcOrUsb = async (output) => {
        const lines = output.trim().split('\n');
        const batteryInfo = {};
        lines.forEach(line => {
            const parts = line.split(':');
            if (parts.length === 2) {
                const key = parts[0].trim();
                const value = parts[1].trim();
                batteryInfo[key] = value;
            }
        });

        const acPowered = batteryInfo['AC powered'] || 'unknown';
        const usbPowered = batteryInfo['USB powered'] || 'unknown';

        if (acPowered == "true" && usbPowered == "false") {
            console.log("ac oliyo")
            setIsCharging(<Text style={{ color: "green", fontWeight: "bold" }}>Charging</Text>)
            setAcOrUsb("AC")
            return "AC";
        }
        else if (acPowered == "false" && usbPowered == "true") {
            console.log("usb olio")
            setIsCharging(<Text style={{ color: "green", fontWeight: "bold" }}>Charging</Text>)
            setAcOrUsb("USB")
            return "USB";
        }

        else {
            console.log("mal sarj almiyor")
            setIsCharging(<Text style={{ color: "#DD5746", fontWeight: "bold" }}>Discharging</Text>)
        }
        console.log("nan deger dondu")
        return "NaN"
    }


    const fetchDataDumpsys = async () => {
        const temp12 = await handleButtonClick("dumpsys battery");
        const temp14 = await fetchAcOrUsb(temp12);

        setAcOrUsb(temp14)
    }



    const fetchData = async () => {
        console.log("It is working. ")
        try {

            if (isRooted) {

                //Voltage Now
                const voltageNowResponse = await handleButtonClick("cat /sys/class/power_supply/bms/voltage_now");
                const voltageM = parseInt(voltageNowResponse) / 1000000;
                setVoltageNow(String(voltageM.toFixed(3)));
                if (voltageNowResponse == undefined) {
                    setIsRooted(false);
                    Alert.alert("Permission Denied!", "Check your root permission and try again.")
                }

                if (onlyOne) {
                    // Voltage Max
                    const voltageMaxResponse = await handleButtonClick("cat /sys/class/power_supply/bms/voltage_max");
                    const voltageN = parseInt(voltageMaxResponse) / 1000000;
                    setVoltageMax(String(voltageN.toFixed(3)));
                }

                // Voltage Average
                const voltageAverageResponse = await handleButtonClick("cat /sys/class/power_supply/bms/voltage_avg");
                const voltageAv = parseInt(voltageAverageResponse) / 1000000;
                setVoltageAvg(String(voltageAv.toFixed(3)));

                // Voltage Min
                const voltageMinResponse = await handleButtonClick("cat /sys/class/power_supply/bms/voltage_min");
                const voltageMi = parseInt(voltageMinResponse) / 1000000;
                setVoltageMin(String(voltageMi.toFixed(3)));



                // Current Now
                const currentNowResponse = await handleButtonClick("cat /sys/class/power_supply/bms/current_now");
                const currentN = parseInt(currentNowResponse) / 1000000;
                setCurrentNow(String(currentN.toFixed(3)));
                console.log(currentNowResponse)

                // Current Average
                const currentAvgResponse = await handleButtonClick("cat /sys/class/power_supply/bms/current_avg");
                const currentAv = parseInt(currentAvgResponse) / 1000000;
                setCurrentAvg(String(currentAv.toFixed(3)));

                // Current Limit
                const currentLimResponse = await handleButtonClick("cat /sys/class/power_supply/battery/constant_charge_current_max");
                const currentLim = parseInt(currentLimResponse) / 1000000;
                setCurrentLimit(String(currentLim.toFixed(3)));

                // Charge Level
                const chargeLevelResponse = await handleButtonClick("cat /sys/class/power_supply/bms/real_capacity");
                const chargeLvl = parseInt(chargeLevelResponse);
                setChargeLevel(String(chargeLvl));


                // Cycle Count
                const cycleCountResponse = await handleButtonClick("cat /sys/class/power_supply/bms/cycle_count");
                const temp4 = parseInt(cycleCountResponse);
                setCycleCount(String(temp4));


                if (onlyOne) {
                    // Battery Health
                    const temp5 = await handleButtonClick("cat /sys/class/power_supply/bms/soh");
                    const temp6 = parseInt(temp5);
                    setBatteryHealth(String(temp6));

                    // Battery Technology
                    const temp7 = await handleButtonClick("cat /sys/class/power_supply/battery/technology");
                    setTechnology(temp7.trim());

                    // AC or USB
                    const temp12 = await handleButtonClick("dumpsys battery");
                    setAcOrUsb(await fetchAcOrUsb(temp12))


                    const temp13 = await handleButtonClick("cat /sys/class/power_supply/bms/battery_type");
                    setBatteryType(<Text style={styles.batteryBrand}>{temp13}</Text>)
                    setOnlyOne(false);
                }

                // Temperature
                const temp8 = await handleButtonClick("cat /sys/class/power_supply/battery/temp");
                const temp9 = parseInt(temp8);
                setTemperature(String((temp9 / 10).toFixed(1)));

                // Max Temperature
                const temp10 = await handleButtonClick("cat /sys/class/power_supply/battery/charger_temp_max");
                const temp11 = parseInt(temp10);
                setMaxTemperature(String((temp11 / 10).toFixed(1)));


                const isChargingResponse = await handleButtonClick("cat /sys/class/power_supply/battery/status");

                if (isChargingPrevious != isChargingResponse.trim()) {

                    const temp15 = await handleButtonClick("dumpsys battery");
                    const araOge = await fetchAcOrUsb(temp15)
                    setAcOrUsb(araOge);

                    if (isChargingResponse.trim() == "Charging") {
                        setIsChargingPrevious("Charging")
                        setIsCharging(<Text style={{ color: "green", fontWeight: "bold" }}>{isChargingResponse.trim()}</Text>)
                    } else {
                        setIsChargingPrevious("Discharging");
                        setIsCharging(<Text style={{ color: "#DD5746", fontWeight: "bold" }}>{isChargingResponse.trim()}</Text>)
                        setAcOrUsb("NaN");
                    }
                }

            }
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
            Alert.alert("Alert", error.message)
        }
    };




    useEffect(() => {
        fetchData();

        const intervalId = setInterval(fetchData, 3000);

        return () => clearInterval(intervalId);
    }, [isRooted]);


    return (
        <View style={{ flex: 1, backgroundColor: "#4793AF" }}>
            <StatusBar backgroundColor="#8B322C" barStyle={'light-content'} />

            <View style={styles.headerView}>
                <Text style={styles.header}>Battery Stats</Text>
            </View>

            <View style={{ flex: 10, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'col' }}>


                <View style={styles.topItems}>

                    <View style={[styles.batteryBar, styles.shadowProperties]}>
                        <Text style={styles.degrees}>{isCharging}</Text>
                        <Text style={styles.chargingSubItems}>Charge Level: {chargeLevel}%</Text>
                        <Text style={styles.chargingSubItems}>Connected: {acOrUsb}</Text>
                        <Text style={styles.chargingSubItems}>Health: {batteryHealth}%</Text>
                        <Text style={styles.chargingSubItems}>Tech: {technology}</Text>
                        <Text style={styles.chargingSubItems}>Cycle: {cycleCount}</Text>
                        <Text style={styles.chargingSubItems}>Temp: {temperature}</Text>
                        <Text style={styles.chargingSubItems}>Max-Temp: {maxTemperature}</Text>
                    </View>
                    <View style={[styles.section2, styles.shadowProperties]}>
                        <Text style={styles.settingsHeader}>Settings</Text>

                        <View style={styles.settingsButtonsView}>
                            <TouchableOpacity onPress={async () => { await handleButtonClick("dumpsys battery reset"); await fetchDataDumpsys(); }} style={styles.settingsButton} activeOpacity={0.6}>
                                <Text style={styles.settingsButtonText}>Battery Plug</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={async () => { await handleButtonClick("dumpsys battery unplug"); await fetchDataDumpsys(); }} style={styles.settingsButton} activeOpacity={0.6}>
                                <Text style={styles.settingsButtonText}>Battery Unplug</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleButtonClick("dumpsys battery", "alert")} style={styles.settingsButton} activeOpacity={0.6}>
                                <Text style={styles.settingsButtonText}>More Info</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>

                <Text style={styles.degrees}>Voltage</Text>


                <View style={styles.threeItems}>
                    <View style={[styles.subFour1, styles.shadowProperties]}>
                        <Text style={styles.aText}>V-Min</Text>
                        <Text style={styles.batteryValue}>{voltageMin}</Text>
                    </View>
                    <View style={[styles.subFour3, styles.shadowProperties]}>
                        <Text style={styles.aText}>V-Now</Text>
                        <Text style={styles.batteryValue}>{voltageNow}</Text>
                    </View>
                    <View style={[styles.subFour2, styles.shadowProperties]}>
                        <Text style={styles.aText}>V-Avg</Text>
                        <Text style={styles.batteryValue}>{voltageAvg}</Text>
                    </View>
                    <View style={[styles.subFour4, , styles.shadowProperties]}>
                        <Text style={styles.aText}>V-Max</Text>
                        <Text style={styles.batteryValue}>{voltageMax}</Text>
                    </View>
                </View>

                <Text style={styles.degrees}>Current</Text>
                <View style={styles.threeItems}>
                    <View style={[styles.subThree1, , styles.shadowProperties]}>
                        <Text style={styles.aText}>A-Now</Text>
                        <Text style={styles.batteryValue}>{currentNow}</Text>
                    </View>
                    <View style={[styles.subThree2, , styles.shadowProperties]}>
                        <Text style={styles.aText}>A-Avg</Text>
                        <Text style={styles.batteryValue}>{currentAvg}</Text>
                    </View>
                    <View style={[styles.subThree3, styles.shadowProperties]}>
                        <Text style={styles.aText}>A-Lim</Text>
                        <Text style={styles.batteryValue}>{currentLimit}</Text>
                    </View>
                </View>

                <Text style={styles.ortaBaslik}>Battery Brand</Text>

                <View style={[styles.section3, styles.shadowProperties]}>
                    {batteryType}
                </View>

            </View>
            <Text style={styles.poweredBy}>github.com/umutsar</Text>
        </View>

    );
}