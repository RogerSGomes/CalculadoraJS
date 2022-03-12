var inputs = document.getElementsByClassName('inp')
inputs[0].value = null
inputs[1].value = null
inputs[2].value = '0'

var btns = document.getElementsByClassName('btn')
var div_hist = document.getElementsByClassName('divhistorico')

var operador = '=',
  hist_operador,
  n1 = 0,
  n2 = 0,
  resultado = null,
  isCalculating = false,
  changeOperator = true,
  cont = 0,
  historico = []

var calculadora = {
  somar: function (n1, n2) {
    return n1 + n2
  },
  subtrair: function (n1, n2) {
    return n1 - n2
  },
  multiplicar: function (n1, n2) {
    return n1 * n2
  },
  dividir: function (n1, n2) {
    return n1 / n2
  },
  porcentagem: function (n1, n2) {
    return (n1 / 100) * n2
  }
}

function btnClick(par) {
  if (par <= 9) {
    if (resultado != 'Erro') {
      if (resultado != null && inputs[0].value == '' && operador != '=') {
        inputs[0].value = inputs[2].value
        inputs[1].value = operador
        inputs[2].value = '0'

        n1 = parseFloat(inputs[0].value)
      }

      if (resultado != null && operador == '=') {
        inputs[2].value = '0'
        resultado = null
      }

      if (inputs[2].value == '0') {
        inputs[2].value = par.toString()
      } else if (inputs[2].value.length < 10) {
        inputs[2].value = inputs[2].value + par.toString()
      }

      if (isCalculating) {
        changeOperator = false
      }
    } else {
      par = 18
    }
  }

  if (par == 10) {
    if (!inputs[2].value.includes('.')) {
      inputs[2].value = inputs[2].value + '.'
    }
  }

  if (par >= 12 && par <= 16) {
    if (resultado != 'Erro') {
      if (changeOperator) {
        inputs[1].value = btns[par].value
        operador = btns[par].value

        if (inputs[0].value == '') {
          inputs[0].value = inputs[2].value
          inputs[2].value = '0'
          n1 = parseFloat(inputs[0].value)
        }

        isCalculating = true
      } else {
        hist_operador = operador
        operador = btns[par].value
        retornaResultado()
      }
    } else {
      par = 18
    }
  }

  if (par == 11) {
    if (resultado != 'Erro') {
      hist_operador = operador
      operador = '='
      retornaResultado()
    } else {
      par = 18
    }
  }

  if (par == 17) {
    if (resultado == null) {
      inputs[2].value = inputs[2].value.substring(0, inputs[2].value.length - 1)

      if (inputs[2].value.length == 0) {
        if (inputs[0].value == '') {
          inputs[2].value = '0'
        } else {
          inputs[2].value = inputs[0].value
          inputs[1].value = null
          inputs[0].value = null

          isCalculating = false
          changeOperator = true
          operador = '='
        }
      }
    } else {
      if (inputs[0].value == '') {
        inputs[0].value = null
        inputs[1].value = null
        inputs[2].value = '0'
        operador = '='
        isCalculating = false
        changeOperator = true
        resultado = null
      } else {
        inputs[2].value = inputs[2].value.substring(
          0,
          inputs[2].value.length - 1
        )
        if (inputs[2].value.length == 0) {
          inputs[2].value = inputs[0].value
          inputs[1].value = null
          inputs[0].value = null

          isCalculating = false
          changeOperator = true

          operador = '='
        }
      }
    }
  }

  if (par == 18) {
    inputs[0].value = null
    inputs[1].value = null
    inputs[2].value = '0'
    operador = '='
    isCalculating = false
    changeOperator = true
    resultado = null
  }
}

function retornaResultado() {
  n2 = parseFloat(inputs[2].value)

  if (inputs[1].value == '+') {
    resultado = calculadora.somar(n1, n2)
  }
  if (inputs[1].value == '-') {
    resultado = calculadora.subtrair(n1, n2)
  }
  if (inputs[1].value == 'x') {
    resultado = calculadora.multiplicar(n1, n2)
  }
  if (inputs[1].value == '/') {
    resultado = calculadora.dividir(n1, n2)
  }
  if (inputs[1].value == '%') {
    resultado = calculadora.porcentagem(n1, n2)
  }

  if (resultado.toString() == 'NaN') {
    resultado = 0
  }

  if (resultado > 9999999999 || resultado < -999999999) {
    resultado = 'Erro'
  }

  inputs[0].value = ''
  inputs[1].value = ''
  inputs[2].value = resultado.toString().substring(0, 10)

  if (operador == '=') {
    isCalculating = false
  }

  if (hist_operador == '%') {
    hist_operador = '/ 100 *'
  }

  if (hist_operador != '=') {
    if (resultado != 'Erro') {
      historico.push(`<div>
      <p>
        ${n1.toString().substring(0, 10)}
        ${hist_operador}
        ${n2.toString().substring(0, 10)}
        =
        ${resultado.toString().substring(0, 10)}
      </p>
    </div>`)
    } else {
      historico.push(`<div><p>Número excedeu limite de caracteres</p></div>`)
    }

    div_hist[0].innerHTML = "<p class='title'>Histórico</p>"
    for (i = historico.length - 1; i >= 0; i--) {
      if (i == historico.length - 1) {
        div_hist[0].innerHTML += `
          <div class='destaque'>
            ${historico[i]}
          </div>
        `
      } else {
        div_hist[0].innerHTML += historico[i]
      }
    }
  }

  changeOperator = true
}

function abreHistorico() {
  if (cont == 0) {
    div_hist[0].style = 'position: relative; z-index: 1; display: flex;'
    cont++
  } else if (cont == 1) {
    div_hist[0].style = 'position: absolute; z-index: -1; display: none;'
    cont--
  }
}
