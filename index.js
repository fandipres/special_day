let year = new Date().getFullYear();
document.getElementById("title").innerHTML += ` ${year}`;

let x;
let choosen_date = document.getElementById("date");
choosen_date.addEventListener("input", function () {
    let event = document.getElementById("event");
    let countdown = document.getElementById("countdown");
    let date_list = document.getElementById("date_list").children;

    let value = this.value.trim();

    if (value === "") {
        event.innerHTML = "";
        countdown.innerHTML = "";
        clearInterval(x);
    } else {
        let [date, month] = value.split(" ");
        const valid_months = {
            "JAN": 31, "FEB": 28, "MAR": 31, "APR": 30, "MEI": 31, "JUN": 30,
            "JUL": 31, "AGU": 31, "SEP": 30, "OKT": 31, "NOV": 30, "DES": 31
        };

        if (month && month.length === 3 && !valid_months[month.toUpperCase()]) {
            event.innerHTML = "Nama bulan salah".toUpperCase();
            countdown.innerHTML = "Sepertinya nama bulan salah.";
            clearInterval(x);
            return;
        }

        if (date && month) {
            let maxDate = valid_months[month.toUpperCase()];
            if (parseInt(date) > maxDate || parseInt(date) <= 0) {
                event.innerHTML = "Tanggal salah".toUpperCase();
                countdown.innerHTML = "Sepertinya tanggal salah.";
                clearInterval(x);
                return;
            }
        }

        let found = Array.from(date_list).find(option => option.value === value);
        if (found || (value.split(" ").length === 2 && value.split(" ")[1].length >= 3)) {
            event.innerHTML = found ? found.label.toUpperCase() : value.toUpperCase() + " " + year;

            let date = value.split(" ")[0];
            let month = value.split(" ")[1].slice(0, 3);
            const month_mappings = {
                "MEI": "May",
                "AGU": "Aug",
                "OKT": "Oct",
                "DES": "Dec"
            };
            month = month_mappings[month.toUpperCase()] || month;

            let countdown_date = new Date(month + " " + date + "," + year + " 00:00:00").getTime();

            clearInterval(x);
            x = setInterval(function () {
                let now = new Date().getTime();
                let distance = countdown_date - now;

                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                countdown.innerHTML = `${days} <font size="2">hari</font>  ${hours} <font size="2">jam</font>  ${minutes} <font size="2">menit</font>  ${seconds} <font size="2">detik</font>`;

                if (distance < 0) {
                    clearInterval(x);
                    countdown.innerHTML = "Oops, hari spesialnya telah berlalu. ~";
                }
            }, 1000);
        }
    }
});