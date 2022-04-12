(()=>{
    interface a {
        a(): any
    }
    
    class nameA implements a {
        a() {
            console.log("这是ts中的class文件夹下的UserClass中的a")
        }
    }
    
    const namea: nameA = new nameA()
    namea.a()
})()