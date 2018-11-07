import axios from 'axios';

class Vistagram{

    constructor(){   
        
        console.log("En clase Vistagram");
    }

    // getTeams() {
    //     return this.teams
    // }

    async getPhotos(){
        try {
            const photos = await axios.get(`http://www.mocky.io/v2/5be1526e3000004c00d9a8c6`)
            // console.log(photos.data)
            return photos.data
        } catch (error) {
            console.log(error)
        }
    }
    
    async paintPhotos(){
        const photos = await this.getPhotos()
        console.log(photos)
        let contador = 1;
        let Printcomment="";
        photos.map( (photo,index) => {
            //  return photo.name
            // console.log(photo.index);
            console.log(photo.username);
            console.log(photo.photoURI);
            console.log(photo.likes);
            console.log(photo.liked);
            console.log(photo.date);
            console.log(photo.comments);
            // console.log(photo.comments[0]);
            // console.log(photo.comments[1]);
            photo.comments.map( comment => {
                console.log(comment);
                Printcomment = Printcomment.concat(`<p>${comment}</p>`);
                // return comment;
            });
            console.log(Printcomment);
            

            let inyetedHtml = `<div class="foto foto${index}">
            <div class="photoURI"><img src="${photo.photoURI}" alt=""></div> 
            <div class="username"><p>${photo.username}</p></div>
            <div class="date"><p>${photo.date}</p></div>
            <div class="comments">
            ${Printcomment}
            </div>
            <div class="likes">${photo.likes}</div>
            <div class="liked">${photo.liked}</div>
            </div>`;

            document.getElementById("contentFotos").innerHTML += inyetedHtml;

            
        })        
    }    

}

export default new Vistagram();