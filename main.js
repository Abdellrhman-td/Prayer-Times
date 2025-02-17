let cities = [
    {
        arabicName: "الرياض",
        isoName: "Ar Riyāḑ"
    },
    {
        arabicName: "مكة المكرمة",
        isoName: "Makkah al Mukarramah"
    },
    {
        arabicName: "عسير",
        isoName: "'Asīr"
    },
    {
        arabicName: "جازان",
        isoName: "Jāzān"
    },
    {
        arabicName: "تبوك",
        isoName: "Tabūk"
    }
]
for (city of cities) {
    const content = `<option>${city.arabicName}</option>`
    document.getElementById("select-city").innerHTML += content
}
document.getElementById("select-city").addEventListener("change", function () {
    document.getElementById("city-header").innerHTML = this.value
    let cityName = ""
    for (city of cities) {
        if (city.arabicName == this.value) {
            cityName = city.isoName
        }
    }
    x(cityName)
})
function x (cityName) {
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: {
            country: "SA",
            city: cityName,
        }
        })
        .then((response) => {
            const prayer_time = response.data.data.timings;
            set_time_for_specific_prayer("Fajr", prayer_time.Fajr);
            set_time_for_specific_prayer("Sunrise", prayer_time.Sunrise);
            set_time_for_specific_prayer("Dhuhr", prayer_time.Dhuhr);
            set_time_for_specific_prayer("Asr", prayer_time.Asr);
            set_time_for_specific_prayer("Sunset", prayer_time.Sunset);
            set_time_for_specific_prayer("Isha", prayer_time.Isha);
            const readableDate = response.data.data.date.readable;
            const weekDay = response.data.data.date.hijri.weekday.ar;
            const date = ( weekDay+" "+readableDate);
            document.getElementById('full-date').innerHTML = date;
        })
        .catch((error) => {
            console.log(error);
        });
}
x("Ar Riyāḑ")

function set_time_for_specific_prayer(id, text) {
    document.getElementById(id).innerHTML = text;
}
