/**
 * Created by Enrique on 4/12/2016.
 */
namespace app.miscelaneous {
    export class Utils {
        //generates a new UUID used to ID each task
        public static uuid() : string {
            var i, random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '_';
                }
                if (i === 12) {
                    uuid += 4
                        .toString(16);
                } else {
                    if (i === 16) {
                        uuid += random & 3 | 8;
                    } else {
                        uuid += random
                            .toString(16);
                    }
                }
            }
            return uuid;
        }

        //adds 's' to the end of a word when count > 1
        public static pluralize (count, word) {
            if (count === 1) {
                return word;
            } else {
                return word + 's';
            }
        }

        //sotres data using the localStorage API
        public static store(namespace, data?){
            if(data){
                return localStorage.setItem(namespace,JSON.stringify(data))
            }
            var store = localStorage.getItem(namespace);
            return (store && JSON.parse(store)) || [];
        }

        //helper for inheritance
        public static extend(...objs : any[]) : any {
            var newObj = {};
            for (var i = 0; i < objs.length; i++){
                var obj = objs[i];
                for (var key in obj){
                    if (obj.hasOwnProperty(key)){
                        newObj[key] = obj[key];
                    }
                }
            }
            return newObj;
        }
    }
}