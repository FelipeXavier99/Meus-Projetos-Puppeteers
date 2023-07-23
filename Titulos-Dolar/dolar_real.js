//NAO ESTÁ MOSTRANDO O RESULTADO MAS A LÓGICA ESTÁ CERTA!



const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

console.log('Bem vindo ao Bot conversor 🤖💰');

async function robo() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const moedaBase = readlineSync.question('Informe uma moeda base: ') || 'dolar';
  const moedaFinal = readlineSync.question('Informe uma moeda desejada:') || 'real';

  const qualquerUrl = `https://www.google.com/search?q=${moedaBase}+pra+${moedaFinal}&oq=${moedaBase}+pra+${moedaFinal}&aqs=chrome.0.69i59j0i10i433i512j0i10i512l8.3137j1j7&sourceid=chrome&ie=UTF-8`;
  

  await page.goto(qualquerUrl);

  // Capturar uma captura de tela para verificar o que está sendo exibido na página
  await page.screenshot({ path: 'screenshot.png' });

  // Aguardar o seletor '.a61j6' em vez de '.lWzCpb.a61j6'
  await page.waitForSelector('.a61j6');

  // Selecionar o elemento '.a61j6'
  const resultadoElement = await page.$('.a61j6');

  // Verificar se o elemento foi encontrado corretamente
  if (resultadoElement) {
    // Obter o texto do elemento
    const resultado = await resultadoElement.evaluate(element => element.textContent);
    console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado}`);
  } else {
    console.log('Não foi possível encontrar o resultado da conversão na página.');
  }

  await browser.close();
}

robo();
