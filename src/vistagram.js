import axios from 'axios';

class Vistagram{

    constructor(){
        this.dateFormat = new Intl.DateTimeFormat("es-ES")
        this.getPhotos().then(photos => {
            this.photos = photos
            this.render()
        })
    }

    async getPhotos(){
        try {
            const photos = await axios.get(`http://www.mocky.io/v2/5be1526e3000004c00d9a8c6`)
            // console.log(photos.data)
            return photos.data
        } catch (error) {
            console.log(error)
        }
    }
    
    render(){
        let inyetedHtml = this.photos.map( (photo,index) => {
            let printComment="";
            photo.comments.map( comment => {
                printComment = printComment.concat(`<p>${comment}</p>`);
                // return comment;
            });
            printComment = printComment || 'No Comments'
            

            return `<div class="foto foto${index}">
            <div class="photoURI"><img src="${photo.photoURI}" alt=""></div>
            <button id="btnLike${index}">BOTON LIKE</button>
            <div class="username"><p>${photo.username}</p></div>
            <div class="date"><p>${this.dateFormat.format(new Date(photo.date))}</p></div>
            <div class="comments">
            ${photo.comments[0] || 'No Comments'}
            ${this.showMoreComments(photo)}
            </div>
            <div class="numComments">
            ${photo.comments.length}
            </div>
            <button id="btnMoreComments${index}">More Comments</button>
            <div class="likes">${photo.likes}</div>
            <div class="liked">${photo.liked}</div>
            </div>`
            
        }).join('');
        document.getElementById('contentFotos').innerHTML = inyetedHtml;
        this.addListener();
    }
    addListener(){
        for (let count = 0; count < this.photos.length; count++) {
            document.getElementById(`btnLike${count}`).addEventListener("click", () => this.putLike(this.photos[count]), false);
        }
    }

    putLike(photo){

        // console.log(photo.photoURI);
        if(!photo.liked)
        {
            this.incLikes(photo);
            this.photos = this.photos.map(function(element) {
                if(element.photoURI === photo.photoURI) element.liked = true
                return element
            });
        }
        this.render()
    }

    incLikes(photo){
        this.photos = this.photos.map(function(element) {
            if(element.photoURI === photo.photoURI) element.likes += 1;
            return element
        });
    }

    showMoreComments(photo){

        console.log('showMoreComments');

        let comments = this.photos.map(function(element) {
            // console.log(element.photoURI);
            // console.log(photo.photoURI);

            if(element.photoURI === photo.photoURI)
                return element.comments.slice(1,element.comments.length)
        });
        console.log(comments);
        return comments

    }


}

export default new Vistagram();