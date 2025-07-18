import { useState } from "react";
import { Text, View, ScrollView, StyleSheet, Switch, Button, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import  DateTimePicker from "@react-native-community/datetimepicker";

const ReservationScreen = () => {
    const [campers, setCampers] = useState(1);
    const [hikeIn, setHikeIn] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios')
        setDate(currentDate)
    }

    const handleReservation = () => {
        console.log('campers:', campers)
        console.log('hikeIn:', hikeIn)
        console.log('date:', date)
        setCampers(1)
        setHikeIn(false)
        setDate(new Date())
        setShowCalendar(false)
    }

    return (
        <ScrollView>
            <View styles={styles.formRow}>
                <Text styles={styles.formLabel}>Number of Campers:</Text>
                <Picker styles={styles.formItem}
                    selectedValue={campers}
                    onValueChange={(itemValue) => setCampers(itemValue)}>
                    <Picker.item label='1' value={1} />
                    <Picker.item label='2' value={2} />
                    <Picker.item label='3' value={3} />
                    <Picker.item label='4' value={4} />
                    <Picker.item label='5' value={5} />
                    <Picker.item label='6' value={6} />
                </Picker>
            </View>
            <View styles={styles.formRow}>
                <Text style={styles.formLabel}>Hike In?</Text>
                <Switch
                    style={styles.formItem}
                    value={hikeIn}
                    trackColor={{ true: '#5637DD', false: null }}
                    onValueChange={(value) => setHikeIn(value)}
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date:</Text>
                <Button
                    onPress={() => setShowCalendar(!showCalendar)}
                    title={date.toLocaleDateString('en-US')}
                    color='5637DD'
                    accessibilityLabel="Tap me to select a reservation date"
                />
            </View>
            {showCalendar && (
                <DateTimePicker
                    style={styles.formItem}
                    value={date}
                    mode='date'
                    display='default'
                    onChange={onDateChange}

                />
            )}
            <View style={styles.formRow}>
                <Button
                    onPress={() => handleReservation()}
                    title="Search Availability"
                    colore='5637DD'
                    accessibilityLabel="Tap me to search for available campsites to reserve"
                />
            </View>
        </ScrollView>
    )




}



const styles = StyleSheet.create({
    formRow: {
        alignItems: ' center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
})
export default ReservationScreen;