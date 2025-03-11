document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada!");
    carregarCarros();
});

function CadastrarCarro() {
    console.log("Cadastrando carro...");

    const placa = document.getElementById("placa").value;
    const tipo = document.getElementById("tipo").value;
    const modelo = document.getElementById("Modelo").value;
    const horas = parseInt(document.getElementById("horas").value);

    if (!placa || !tipo || !modelo || !horas) {
        alert("Preencha todos os campos!");
        return;
    }

    const preco = calcularPreco(modelo, tipo, horas);

    const carro = { placa, tipo, modelo, horas, preco };
    let carros = JSON.parse(sessionStorage.getItem("carros")) || [];
    carros.push(carro);
    sessionStorage.setItem("carros", JSON.stringify(carros));

    console.log("Carro cadastrado:", carro);

    document.getElementById("placa").value = "";
    document.getElementById("tipo").value = "eletrico";
    document.getElementById("Modelo").value = "compacto";
    document.getElementById("horas").value = "1";

    carregarCarros();
}

function calcularPreco(modelo, tipo, horas) {
    let precoPorHora = 0;

    switch (modelo) {
        case "compacto":
            precoPorHora = 2.00;
            break;
        case "hatch":
        case "sedan":
            precoPorHora = 2.50;
            break;
        case "suv":
            precoPorHora = 3.00;
            break;
        case "picape":
            precoPorHora = 4.00;
            break;
        default:
            precoPorHora = 2.00;
    }

    let precoTotal = precoPorHora * horas;

    if (tipo === "eletrico") {
        precoTotal *= 0.5;
    }

    return precoTotal.toFixed(2);
}

function carregarCarros() {
    console.log("Carregando carros...");

    const carList = document.getElementById("carList");
    carList.innerHTML = "";

    let carros = JSON.parse(sessionStorage.getItem("carros")) || [];

    if (carros.length === 0) {
        console.log("Nenhum carro encontrado no sessionStorage.");
        carList.innerHTML = "<p>Nenhum carro cadastrado.</p>";
        return;
    }

    carros.forEach((carro, index) => {
        let div = document.createElement("div");
        div.classList.add("car-item");
        div.innerHTML = `
            <p><strong>Placa:</strong> ${carro.placa}</p>
            <p><strong>Modelo:</strong> ${carro.modelo}</p>
            <p><strong>Tipo:</strong> ${carro.tipo}</p>
            <p><strong>Horas:</strong> ${carro.horas}</p>
            <p><strong>Valor a pagar:</strong> R$ ${carro.preco}</p>
            <button class="delete-btn" onclick="removerCarro(${index})">Excluir</button>
        `;
        carList.appendChild(div);
    });
}

function removerCarro(index) {
    console.log(`Removendo carro na posição ${index}`);
    let carros = JSON.parse(sessionStorage.getItem("carros")) || [];
    carros.splice(index, 1);
    sessionStorage.setItem("carros", JSON.stringify(carros));
    carregarCarros();
}
