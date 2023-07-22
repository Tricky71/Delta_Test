document.addEventListener('DOMContentLoaded', function () {

  const mockData = [{
        name: 'Выручка',
        data: [50934, 49000, 51165, 45827]
    }, {
        name: 'Наличные',
        data: [25934, 24500, 25000, 25827]
    }, {
        name: 'Безналичный расчет',
        data: [12000, 12000, 13000, 10500]
    }, {
        name: 'Кред. карты',
        data: [13000, 12500, 13165, 9500]
    }, {
        name: 'Средний чек, руб',
        data: [980, 990, 1005, 950]
    }, {
        name: 'Средний гость, руб',
        data: [980, 990, 1005, 950]
    }, {
        name: 'Количество чеков',
        data: [52, 51, 49, 48]
    }, {
        name: 'Количество гостей',
        data: [52, 51, 49, 48]
    }];

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
})    


