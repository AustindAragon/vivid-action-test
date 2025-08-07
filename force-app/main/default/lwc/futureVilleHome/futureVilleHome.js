import { LightningElement, track } from 'lwc';
import home_images from '@salesforce/resourceUrl/FutureVilleImages';
import futuremin_css from '@salesforce/resourceUrl/futuremin';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import { NavigationMixin } from 'lightning/navigation';
import bostonLogo from '@salesforce/resourceUrl/essexLogo';

export default class FutureVilleHome extends NavigationMixin(LightningElement) {

    logoImage = bostonLogo;
    licenseImage = home_images + '/images/license.png';
    applyImage = home_images + '/images/apply.png';
    requestImage = home_images + '/images/request.png';
    accountImage = home_images + '/images/account.png';
    infoImage = home_images + '/images/info.png';

    setTimeInterval;
    @track name;


    bannerImages = [ '/resource/BannerImages/banner1-min.png', '/resource/BannerImages/banner2-min.png', '/resource/BannerImages/banner3-min.png',
    '/resource/BannerImages/banner4-min.png', '/resource/BannerImages/banner5-min.png'];
    currentBannerIndex = 0;

    handleEnter(event){
        this.name= event.target.value;

        if(event.keyCode === 13){
           if(this.name.toLowerCase() == 'apply for permit'){
            console.log('apply: ',this.name.toLowerCase())
            this.redirectToPermit();
           }
           else if (this.name != undefined || this.name != null){
             console.log('SearchKey'+this.name);
             this.redirectToArticles();
           }
        }
    }

    handleSearch(){
        if(this.name.toLowerCase() == 'apply for permit'){
            console.log('apply: ',this.name.toLowerCase())
            this.redirectToPermit();
           }
           else if (this.name != undefined || this.name != null){
            console.log('SearchKey'+this.name);
            this.redirectToArticles();
           } 
    }

    handleChange(event){
        this.name= event.target.value;
    }

    redirectToPermit(event){
        this[NavigationMixin.Navigate]({
            type:'comm__namedPage',
            attributes:{
                name: 'Start_Application'
            }
        });
    }

    redirectToArticles(event){
        console.log('entry');
        this[NavigationMixin.Navigate]({
          type: 'standard__search',
          state: {
            term: this.name
          }
       });
    }

    connectedCallback(){

        Promise.all([
          loadStyle(this, futuremin_css )
        ]).then(() => {
        }).catch(err=>{
            console.log('err-',err);
        });

        let tempThis = this;
        
        this.setTimeInterval = setInterval(() => {

            let slider = tempThis.template.querySelector('.slider-1');
            slider.style.backgroundImage = `url("${tempThis.bannerImages[tempThis.currentBannerIndex]}")`;
            console.log('slider.style= ',slider.style);
            console.log('slider.backgroundImage= ',slider.style.backgroundImage);
            tempThis.currentBannerIndex = (tempThis.currentBannerIndex + 1) % tempThis.bannerImages.length;

            slider.style.opacity = 1
        },4000);
    }

    redirect(event){
        this[NavigationMixin.Navigate]({
            type:'comm__namedPage',
            attributes:{
                name: event.currentTarget.dataset.value
            }
        });
    }

    changeBackgroundImage() {
      
    }
}