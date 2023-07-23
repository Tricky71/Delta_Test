'use strict'; 

const tableBody = document.querySelector('tbody');

const createTableCells = (el, i) => {
  return (
    `<tr class="chart__row" tabindex= "1">
      <th>${el.name}</th>
      <td>${el.data[0]}</td>
      <td>${el.data[1]}</td>
      <td>${el.data[2]}</td>
      <td>${el.data[3]}</td>
    </tr>
    <tr>
      <td colspan = "10"  style="padding: 0">
        <div id="container--${i}" class="chart__dia" style="width:100%; height:300px"></div>
      </td>
    </tr>  
    `
  );
};

const render = (container, template, place = "beforeend") => {
  container.insertAdjacentHTML(place, template);
};

(async () => {
  const obj = await fetch('js/data.json');
  const result = await obj.json();

  const mockData = JSON.parse(JSON.stringify(result));

  mockData.forEach((e, i) => {
    render(tableBody, createTableCells(e, i));
  });

  mockData.forEach((e, i) => {
    Highcharts.chart(`container--${i}`, {

    title: {
        text: '',
        align: 'left'
    },

    subtitle: {
        text: '',
        align: 'left'
    },

    yAxis: {
        title: {
            text: ''
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: ''
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {  
        series: {
            label: {
                connectorAllowed: false
            },
        }
    },

    series: [mockData[i]],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
      }
    })
  });

  const rows = document.querySelectorAll('.chart__row'),
      dias = document.querySelectorAll('.chart__dia'),
      chart = document.querySelector('.chart__body');

  const hideDiasContent = () => {
    dias.forEach((e) => {
      e.style.display = 'none'
    })
  };  

  const showDiaContent = (i) => {
  dias[i].style.display = 'block';
  };

  hideDiasContent();

  rows.forEach((e, i) => {
    e.addEventListener('click', () => {
      hideDiasContent();
      showDiaContent(i);  
    })
  });

  rows.forEach((e, i) => {
    e.addEventListener('keydown', (evt) => {
      if (evt.code === 'Enter') {
        hideDiasContent();
        showDiaContent(i);
      }
    })
  });

  chart.addEventListener('click', (evt) => {
    let target = evt.target;
    if (target && target.classList.contains('chart__row')) {
      console.log(target);
      rows.forEach((e, i) => {
        if (target == e) {
          hideDiasContent();
          showDiaContent(i);
        }
      })
    }
  });
})();

    

  

     

  


