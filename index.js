const soapRequest = require('easy-soap-request');
const prompt = require('prompt-sync')();

const url = 'http://localhost:8080/ws';
    const sampleHeaders = {
        'Content-Type': 'text/xml;charset=UTF-8',
    };
    
async function calculate(operator, firstNum, secondNum) {
    try {
        const xml = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                            xmlns:gs="http://www.abc.com/calculator/gen">
            <soapenv:Header/>
            <soapenv:Body>
                <gs:calculateRequest>
                    <gs:operator>${operator}</gs:operator>
                    <gs:firstNum>${firstNum}</gs:firstNum>
                    <gs:secondNum>${secondNum}</gs:secondNum>
                </gs:calculateRequest>
            </soapenv:Body>
        </soapenv:Envelope>
        `;
        const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 });
        const {body} = response;
        return body.split("result>")[1].split("</ns2:")[0];
    } catch (error) {
        console.log(error);
    }
}
    
const main = async () => {
    try {
        while(1) {
            const firstNum = prompt('Enter first number:');
            const secondNum = prompt('Enter second number:');
            const operator = prompt('Enter operator:');
            const result = await calculate(operator, firstNum, secondNum);
            console.log(result);
            const ctn = prompt('Continue (y|n):');
            if (ctn == "n") {
                break;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

main();