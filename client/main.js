const tableBody = document.getElementById('table-body')

const getFlights = () => {
    fetch('http://localhost:8000/flights')
        .then(response => response.json())
        .then(flights => {
            const nextSixFlights = flights[0].list.splice(0,10)
            console.log(flights[0].list.splice(0,10))
            populateTable(nextSixFlights)
        })
        .catch(error => console.log(error))
}

getFlights()

const populateTable = (flights) => {
    for(const flight of flights){
        const tableRow = document.createElement('tr')
        const tableIcon = document.createElement('td')
        tableIcon.textContent = '✈'
        tableRow.append(tableIcon)

        const flightDetails = {
            destination: flight.destination[0],
            flight: flight.flight[0].no,
            gate: flight.gate,
            remarks: flight.status
        }

        for (const flightDetail in flightDetails){
            const tableData = document.createElement('td')
            const word = Array.from(flightDetails[flightDetail])

            for (const [index, letter] of word.entries()){
                const letterElement = document.createElement('div')

                setTimeout(() => {
                    letterElement.classList.add('flip')
                    letterElement.textContent = letter
                    tableData.append(letterElement)
                }, 500*index)

            }
            tableRow.append(tableData)
        }

        tableBody.append(tableRow)
    }
}