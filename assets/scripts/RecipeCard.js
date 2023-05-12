// RecipeCard.js

let tmpHTML = undefined;

class RecipeCard extends HTMLElement {
    // Called once when document.createElement('recipe-card') is called, or
    // the element is written into the DOM directly as <recipe-card>

    articleHTML = null;
    styleHTML = null;
    constructor() {
        super(); // Inheret everything from HTMLElement

        // EXPOSE - START (All expose numbers start with A)
        // A1. TODO - Attach the shadow DOM to this Web Component (leave the mode open)
        this.shadow = this.attachShadow({ mode: 'open' });

        // A2. TODO - Create an <article> element - This will hold our markup once our data is set
        this.articleHTML = document.createElement('article');

        // A3. TODO - Create a style element - This will hold all of the styles for the Web Component
        this.styleHTML = document.createElement('style');

        // A4. TODO - Insert all of the styles from cardTemplate.html into the <style> element you just made

        if (tmpHTML) {
            this.styleHTML.innerHTML = tmpHTML.getElementsByTagName('style')[0].innerHTML;
            this.articleHTML.innerHTML = tmpHTML.getElementsByTagName('article')[0].innerHTML;
        } else {
            fetch("./reference/cardTemplate.html").then(
                (response) => response.text()
            ).then(
                (data) => {
                    tmpHTML = document.createElement('html');
                    tmpHTML.innerHTML = data;
                    let style = tmpHTML.getElementsByTagName('style')[0];
                    let article = tmpHTML.getElementsByTagName('article')[0];
                    this.articleHTML.innerHTML = article.innerHTML;
                    this.styleHTML.innerHTML = style.innerHTML;
                    console.log("fetch done");

                }
            );
        }

        // A5. TODO - Append the <style> and <article> elements to the Shadow DOM
        this.shadow.appendChild(this.articleHTML);
        this.shadow.appendChild(this.styleHTML);
    }

    /**
     * Called when the .data property is set on this element.
     *
     * For Example:
     * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
     * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     *
     * @param {Object} data - The data to pass into the <recipe-card>, must be of the
     *                        following format:
     *                        {
     *                          "imgSrc": "string",
     *                          "imgAlt": "string",
     *                          "titleLnk": "string",
     *                          "titleTxt": "string",
     *                          "organization": "string",
     *                          "rating": number,
     *                          "numRatings": number,
     *                          "lengthTime": "string",
     *                          "ingredients": "string"
     *                        }
     */
    set data(data) {
        // If nothing was passed in, return
        if (!data) return;

        // A6. TODO - Select the <article> we added to the Shadow DOM in the constructor
        let article = this.shadow.querySelector('article');

        // A7. TODO - Set the contents of the <article> with the <article> template given in
        //           cardTemplate.html and the data passed in (You should only have one <article>,
        //           do not nest an <article> inside another <article>). You should use Template
        //           literals (tempalte strings) and element.innerHTML for this.
        this.setData_untilHadTemplate(data);
    }

    async setData_untilHadTemplate(data) {
        let article = this.shadow.querySelector('article');
        while (article.innerHTML === "") {
            await new Promise(r => setTimeout(r, 50));
            article = this.shadow.querySelector('article');
        }
        article.getElementsByTagName('img')[0].src = data.imgSrc;
        article.getElementsByTagName('img')[0].alt = data.imgAlt;
        let title_aHTML = article.getElementsByClassName('title')[0].children[0];
        title_aHTML.href = data.titleLnk;
        title_aHTML.textContent = data.titleTxt;
        article.getElementsByClassName('organization')[0].textContent = data.organization;
        let ratingHTML = article.getElementsByClassName('rating')[0];
        ratingHTML.children[0].textContent = data.rating;
        let ratingImgHTML = ratingHTML.children[1];
        switch (data.rating) {
            case 0:
                ratingImgHTML.src = "./assets/images/icons/0-star.svg";
                break;
            case 1:
                ratingImgHTML.src = "./assets/images/icons/1-star.svg";
                break;
            case 2:
                ratingImgHTML.src = "./assets/images/icons/2-star.svg";
                break;
            case 3:
                ratingImgHTML.src = "./assets/images/icons/3-star.svg";
                break;
            case 4:
                ratingImgHTML.src = "./assets/images/icons/4-star.svg";
                break;
            case 5:
                ratingImgHTML.src = "./assets/images/icons/5-star.svg";
                break;
        }
        let ratingCountHTML = ratingHTML.children[2];
        ratingCountHTML.textContent = "(" + data.numRatings + ")";

        let lengthTimeHTML = article.getElementsByTagName('time')[0];
        lengthTimeHTML.textContent = data.lengthTime;

        let ingredientsHTML = article.getElementsByClassName('ingredients')[0];
        ingredientsHTML.textContent = data.ingredients;
    }
}

// A8. TODO - Define the Class as a customElement so that you can create
//           'recipe-card' elements
customElements.define('recipe-card', RecipeCard);