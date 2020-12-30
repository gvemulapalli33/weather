import rainIcon from '../Images/rainy-weather.gif';
import snowIcon from '../Images/light-snowy-weather.gif';
import windyIcon from '../Images/windy-cloud-weather.gif';
import nightIcon from '../Images/night-weather.gif';
import cloudIcon from '../Images/cloudy-weather.gif';
import fogIcon from '../Images/fog-weather.gif';
import thunderStormIcon from '../Images/lightning-weather.gif';
import sunsetIcon from '../Images/sunset-weather.gif';
import temperatureIcon from '../Images/temperature-weather.gif';
import sunIcon from '../Images/sun.gif';

export const formatTemperature = (temp) => {
    return Math.round((temp * 9/5 + 32)) +"˚";
}  

export const formatTime = (date, showMinutes) => {
    let hours = date && date.getHours(),
        meridian = 'AM';
    
    if(hours >= 12) {
      if(hours > 12) {
        hours -= 12;
      }
      meridian = 'PM';
    }
    
    if (hours === 0) {
      hours = 12;
    }
    
    if(showMinutes) {
      let minutes = date.getMinutes();
      if(minutes < 10) {
        minutes = '0'+minutes;
      }
      
      return hours + ':' + minutes + ' ' + meridian;
    }
    return hours + ' ' + meridian;
  };

 export const imageMapping = {
    windyIcon,
    snowIcon,
    nightIcon,
    rainIcon,
    cloudIcon,
    fogIcon,
    thunderStormIcon,
    sunsetIcon,
    temperatureIcon,
    sunIcon
}