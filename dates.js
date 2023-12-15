let dates = [
    { label: "Dirgahayu Kemerdekaan RI", date: "0817" },
    { label: "Happy Birthday Angel", date: "0326" },
    { label: "Happy Birthday Fandi", date: "0902" },
    { label: "Happy Valentine", date: "0214" },
    { label: "Hari Buruh", date: "0501" },
    { label: "Hari Guru", date: "1125" },
    { label: "Hari Kesaktian Pancasila", date: "1001" },
    { label: "Hari Lahir Pancasila", date: "0601" },
    { label: "Hari Pahlawan", date: "1110" },
    { label: "Hari Raya Natal", date: "1225" },
    { label: "Hari Sumpah Pemuda", date: "1028" },
    { label: "Tahun Baru", date: "0101" },
];

let months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

dates.sort((a, b) => {
    let dateA = a.date;
    let dateB = b.date;

    if (dateA < dateB) {
        return -1;
    }
    if (dateA > dateB) {
        return 1;
    }
    return 0;
});

function FormatDate(date) {
    let month = months[parseInt(date.substring(0, 2)) - 1];
    let day = parseInt(date.substring(2));
    return day + " " + month;
}

function ListDate() {
    var date_list = document.getElementById("date_list");
    dates.forEach(function (date) {
        var option = document.createElement("option");
        option.value = FormatDate(date.date)
        option.label = date.label;
        date_list.appendChild(option);
    });
}

ListDate();