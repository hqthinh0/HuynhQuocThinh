

    document.getElementById("calculateBtn").addEventListener("click", function() {  

        let n = parseInt(document.getElementById("number").value);

        console.log("n",n);
        
        var sum_to_n_a = function(n) {
            // your code here
            return (n * (n + 1)) / 2;
        
        };

        document.querySelector(".result_sum_a").textContent = `sum_A: ${sum_to_n_a(n)}`;
        


        var sum_to_n_b = function(n) {
        let sum = 0;
        for (let index = 1; index <= n; index++) {
                sum += index;
        }
        return sum;
        };

        document.querySelector(".result_sum_b").textContent = `sum_B: ${sum_to_n_b(n)}`;


        var sum_to_n_c = function(n) {
            let sum = 0 , index = 1;
            while (index <= n ) {
                sum += index;
                index++;
            }
            return sum;
        };
        document.querySelector(".result_sum_c").textContent = `sum_C: ${sum_to_n_c(n)}`;
    });
