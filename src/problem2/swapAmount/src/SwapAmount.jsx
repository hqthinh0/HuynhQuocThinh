import React , {useState, useEffect} from "react";

import './assets/style.scss';

const SwapAmount = () =>{

    const [currencies, setCurrencies] = useState([]); // Danh sách tiền tệ
    const [fromCurrency, setFromCurrency] = useState("USD"); // Tiền gửi
    const [toCurrency, setToCurrency] = useState("USD"); // Tiền nhận
    const [exchangeRates, setExchangeRates] = useState({}); // Lưu tỷ giá từ API
    const [inputAmount, setInputAmount] = useState("");
    const [outputAmount, setOutputAmount] = useState("");

    useEffect(() => {
        // Gọi API lấy tỷ giá khi component mount
        const fetchPrices = async () => {
          try {
            const response = await fetch("https://interview.switcheo.com/prices.json");
            const data = await response.json();
            console.log("data",data);
           
            // Lưu danh sách tiền tệ
            const currencyList = [...new Set(data.map(item => item.currency))];
            const rates = data.reduce((acc, item) => {
                acc[item.currency] = item.price;
                return acc;
            }, {});
            setCurrencies(currencyList);
            setExchangeRates(rates);
        
          } catch (error) {
            console.error("Error fetching prices:", error);
          }
        };
    
        fetchPrices();
      }, []);

    const handleSubmit =  () => {
        
        const fromRate = exchangeRates[fromCurrency];
        console.log("fromRate",fromRate);
        
        const toRate = exchangeRates[toCurrency];
        console.log("toRate",toRate);

        if (!inputAmount || !fromCurrency || !toCurrency) {
            alert("Input not empty");
            return;
        }
        
        const convertedAmount = parseFloat(inputAmount) * (toRate / fromRate);
        setOutputAmount(convertedAmount.toFixed(2)); 
        
      };

      
      return (
        <section className="container">
           <div className="swap-container">
            <h2>Currency Swap</h2>
        
            <label>From:</label>
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                <option value="">Select Currency</option>
                {currencies.map(currency => (
                <option key={currency} value={currency}>
                    {currency}
                </option>
                ))}
            </select>
        
            <label>To:</label>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                <option value="">Select Currency</option>
                {currencies.map(currency => (
                <option key={currency} value={currency}>
                    {currency}
                </option>
                ))}
            </select>
        
            <div className="input-container">
                <div className="amount">
                <label>Amount to send</label>
                <input
                    type="number"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                />
                </div>
        
                <div className="amount">
                <label>Amount to receive</label>
                <input type="number" value={outputAmount} disabled />
                </div>
            </div>
        
            <button className="confirm-btn" onClick={handleSubmit}>CONFIRM SWAP</button>
            </div>
        </section>
      );

}
export default SwapAmount;