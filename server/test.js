var json = [
   {
      section: "A",
      row: "1",
      startSeat: "3",
      endSeat: "4",
   },
   {
      section: "A",
      row: "1",
      startSeat: "1",
      endSeat: "2",
   },
   {
      section: "B",
      row: "2",
      startSeat: "5",
      endSeat: "8",
   },
   {
      section: "B",
      row: "2",
      startSeat: "9",
      endSeat: "12",
   },
   {
      section: "C",
      row: "3",
      startSeat: "13",
      endSeat: "15",
   },
   {
      section: "C",
      row: "3",
      startSeat: "17",
      endSeat: "19",
   },
   {
      section: "D",
      row: "4",
      startSeat: "21",
      endSeat: "25",
   },
   {
      section: "D",
      row: "4",
      startSeat: "27",
      endSeat: "30",
   },
]

const arrayBetween = (start, end) => {
   const array = []
   for (let i = start; i <= end; i++) {
      array.push(i)
   }
   return array
}

const sortArray = (array) => {
   const sortedArray = array.sort((a, b) => {
      return a - b
   })
   return sortedArray
}

const formatSectionData = (array) => {
   const sectionArrayOfObjects = []
   let prevSectionIndex = 0
   const visitedSections = new Set()

   for (let element of array) {
      const existingSectionIndex = sectionArrayOfObjects.findIndex((object) => {
         return element.section === object.section
      })

      let currentIndex = 0
      if (existingSectionIndex === -1) {
         currentIndex = visitedSections.size
      } else {
         currentIndex = existingSectionIndex
      }
      visitedSections.add(element.section)

      const currentSectionObject = sectionArrayOfObjects[currentIndex] || {}

      if (prevSectionIndex !== 0) {
         prevSection = array[prevSectionIndex - 1].section
      }

      let row = currentSectionObject["row" + element.row] || []

      const seatsToAdd = arrayBetween(
         parseInt(element.startSeat),
         parseInt(element.endSeat)
      )
      currentSectionObject["row" + element.row] = [...row, ...seatsToAdd]
      currentSectionObject.section = element.section
      sectionArrayOfObjects[currentIndex] = currentSectionObject
   }

   console.log(sectionArrayOfObjects)
   // Sort each row
   sectionArrayOfObjects.map((element, index) => {
      for (let key in element) {
         if (key.includes("row")) {
            const row = element[key]
            const sortedRow = sortArray(row)

            sectionArrayOfObjects[index][key] = sortedRow
         }
      }
   })

   return sectionArrayOfObjects
}

const checkRow = (numberOfSeats, row) => {
   if (!row) return null
   if (row.length === 0) return null
   let prevNum = row[0] - 1
   let currentSeats = []
   for (let num of row) {
      if (num - prevNum === 1) {
         currentSeats.push(num)
         if (currentSeats.length === numberOfSeats) return currentSeats
         prevNum = num
      } else {
         currentSeats = []
      }
   }
}

// Finds first adjacent seats
const findAdjacentSeats = (numberOfSeats, data) => {
   const adjacentSeats = {}
   data.map((element) => {
      for (let key in element) {
         if (key.includes("row")) {
            const row = element[key]
            const foundRow = checkRow(numberOfSeats, row)

            if (foundRow) {
               adjacentSeats["section" + element.section + "-" + key] = foundRow
            }
         }
      }
   })
   return adjacentSeats
}

const formatedData = formatSectionData(json)

console.log("ADJACENT SEATS 1", findAdjacentSeats(1, formatedData))

console.log("ADJACENT SEATS 2", findAdjacentSeats(2, formatedData))

console.log("ADJACENT SEATS 3", findAdjacentSeats(3, formatedData))

console.log("ADJACENT SEATS 4", findAdjacentSeats(4, formatedData))

console.log("ADJACENT SEATS 5", findAdjacentSeats(5, formatedData))

console.log("ADJACENT SEATS 6", findAdjacentSeats(6, formatedData))

console.log("ADJACENT SEATS 7", findAdjacentSeats(7, formatedData))

console.log("ADJACENT SEATS 8", findAdjacentSeats(8, formatedData))

console.log("ADJACENT SEATS 9", findAdjacentSeats(9, formatedData))
