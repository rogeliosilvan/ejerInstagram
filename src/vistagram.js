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
            return photos.data
        } catch (error) {
            console.log(error)
        }
    }
    
    async paintPhotos(){
        const photos = await this.getPhotos()
        console.log(photos)
        photos.map( async photo => {
            //  return photo.name 
            console.log(photo.username);
            
        })        
    }    

}

export default new Vistagram();