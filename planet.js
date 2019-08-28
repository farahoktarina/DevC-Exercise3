
const statusAPIFunction = (res) => {
  if(res.status !== 200){
    console.log('Error : '+ res.status)
    return Promise.reject(new Error(res.statusText))
  }else{
    // agar bisa di then
    return Promise.resolve(res)
  }
}

// memparsing json menjadi array js
const jsonAPIFunction = (res) =>{
return res.json()
}
// handle error
const errorAPIFunction  = (err) =>{
  console.log('Error : '+err)
}

const getData = () =>{
  return new Promise((resolve,reject)=>{
    let planets = []
    fetch('https://swapi.co/api/planets/',{
      method:'GET'
    })
    .then(statusAPIFunction)
    .then(jsonAPIFunction)
    .then(data=>{
      planets = data.results
      resolve(planets)
    }).catch(err=>reject(err))
  })
}

const filter = () =>{
    getData().then(planets=>{
      const getValueFilter = document.getElementById('filter').value 
      const data = planets.filter(planet=>{
          return planet.name.toLowerCase().includes(getValueFilter) 
          || planet.rotation_period.toLowerCase().includes(getValueFilter)
          || planet.orbital_period.toLowerCase().includes(getValueFilter)
          || planet.diameter.toLowerCase().includes(getValueFilter)
          || planet.climate.toLowerCase().includes(getValueFilter)
          || planet.gravity.toLowerCase().includes(getValueFilter)
          || planet.terrain.toLowerCase().includes(getValueFilter)
          || planet.surface_water.toLowerCase().includes(getValueFilter)
          || planet.population.toLowerCase().includes(getValueFilter)
      })
      if(data.length>0){
        showData(data)
      }else{
        showDataEmpty()
      }

    })
}

const showDataEmpty = () =>{
  let tr,td 
  let tbody = document.getElementById('tbody')
  tbody.innerHTML = ''
  tr = tbody.insertRow(tbody.rows.length)
  td = tr.insertCell(tr.cells.length)
  td.setAttribute("colspan",10)
  td.setAttribute("align","center")
  td.innerHTML = 'Data not Found!'
}

const showData = (data) =>{
    let tr,td 
    let tbody = document.getElementById('tbody')
    tbody.innerHTML = ''
    for(let i=0; i<data.length;i++){
          tr = tbody.insertRow(tbody.rows.length)
          // No
          td = tr.insertCell(tr.cells.length)
          td.setAttribute("align","center")
          td.innerHTML=i+1
          // Name 
          td = tr.insertCell(tr.cells.length)
          td.innerHTML = `<a href="${data[i].url}" target="_blank">${data[i].name}</a>`
          // Rotation Period
          td = tr.insertCell(tr.cells.length)
          td.setAttribute("align","center")
          td.innerHTML = data[i].rotation_period
          // Orbital Period
          td = tr.insertCell(tr.cells.length)
          td.setAttribute("align","center")
          td.innerHTML = data[i].orbital_period
          // Diameter
          td = tr.insertCell(tr.cells.length)
          td.setAttribute("align","center")
          td.innerHTML = data[i].diameter
          // Climate
          td = tr.insertCell(tr.cells.length)
          td.setAttribute("align","center")
          td.innerHTML = data[i].climate
          // Gravity
          td = tr.insertCell(tr.cells.length)
          td.setAttribute("align","center")
          td.innerHTML = data[i].gravity
          // Terrain
          td = tr.insertCell(tr.cells.length)
          td.setAttribute("align","center")
          td.innerHTML = data[i].terrain
          // Surface Water 
          td = tr.insertCell(tr.cells.length)
          td.setAttribute("align","center")
          td.innerHTML = data[i].surface_water
          // Population
          td = tr.insertCell(tr.cells.length)
          td.setAttribute("align","center")
          td.innerHTML = data[i].population
    }
}