let event = [
    { label: "Dirgahayu Kemerdekaan RI", date: "0817" },
    { label: "Happy Birthday Angel", date: "0326" },
    { label: "Happy Anniversary", date: "0623" },
    { label: "Happy Birthday Fandi", date: "0902" },
    { label: "Happy Birthday Evelyn", date: "0821" },
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

event.sort((a, b) => {
    let date_a = a.date;
    let date_b = b.date;
    if (date_a < date_b) {
        return -1;
    }
    if (date_a > date_b) {
        return 1;
    }
    return 0;
});

function FormatDate(date) {
    let day = parseInt(date.substring(2));
    let month = months[parseInt(date.substring(0, 2)) - 1];
    return day + " " + month;
}

function ListDate() {
    let el_date_list = document.getElementById("date_list");
    event.forEach(function (date) {
        let el_option = document.createElement("option");
        el_option.value = FormatDate(date.date)
        el_option.label = date.label;
        el_date_list.appendChild(el_option);
    });
}

ListDate();