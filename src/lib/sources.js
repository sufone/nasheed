const audios = [
    // {
    //     "id": 1, simply sequential
    //     "qasidah": "", qasida
    //     "author": "", with titles
    //     "munshid": "", with titles
    //     "filename": "",
    //     "source": "" YT URL
    // },
    {
        "id": 1, 
        "qasidah": "هنيني بذكر الله",
        "author": "الشيخ محمد سعيد الكردي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "hanini1",
        "source": ""
    },
    {
        "id": 2, 
        "qasidah": "هنيني بذكر الله",
        "author": "الشيخ محمد سعيد الكردي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "hanini2",
        "source": ""
    },
    {
        "id": 3, 
        "qasidah": "دع الدنيا وما فيها",
        "author": "الشيخ محمد سعيد الكردي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "da3idunya1",
        "source": ""
    },
    {
        "id": 4, 
        "qasidah": "يا ناس ما جننت ولكني حيران",
        "author": "الشيخ محمد سعيد الكردي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "yanasmajunintu1",
        "source": ""
    },
    {
        "id": 5, 
        "qasidah": "مريدا سارع بقلب خاشع",
        "author": "الشيخ محمد سعيد الكردي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "muridansari31",
        "source": ""
    },
    {
        "id": 6, 
        "qasidah": "إني إذا ما ذكرت ربي يهتز شوقي إلى لقاه",
        "author": "الشيخ أبو مدين الغوث",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "iniidhamadhakartu1",
        "source": ""
    },
    {
        "id": 7, 
        "qasidah": "وترى القوم سكارى (بيات 1)",
        "author": "الشيخ عبد الرحمن الشاغوري",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "wataraalqawm1",
        "source": ""
    },
    {
        "id": 8, 
        "qasidah": "أيها الطالع من مشرق أفلاك الغيوب",
        "author": "الشيخ عبد الغني النابلسي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "ayyuhaltali1",
        "source": "https://www.youtube.com/watch?v=G99RS8x0-KE"
    },
    {
        "id": 9, 
        "qasidah": "ما لذة العيش إلا صحبة الفقرا",
        "author": "الشيخ أبو مدين الغوث",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "maladhdha1",
        "source": ""
    },
    {
        "id": 10, 
        "qasidah": "إذا ما سمت نائبة الليالي",
        "author": "الشيخ شكري لحفي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "idhamasumtu1",
        "source": ""
    },
    {
        "id": 11, 
        "qasidah": "وترى القوم سكارى (بيات 22)",
        "author": "الشيخ عبد الرحمن الشاغوري",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "wataraalqawm2",
        "source": ""
    },
    {
        "id": 12, 
        "qasidah": "الزم باب ربك واترك العباد",
        "author": "الشيخ محمد سعيد الكردي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "ilzimbab1",
        "source": ""
    },
    {
        "id": 13, 
        "qasidah": "الله قصدي لا أريد سواه",
        "author": "الشيخ محمد سعيد الكردي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "allahuqasdi1",
        "source": ""
    },
    {
        "id": 14, 
        "qasidah": "فإن يكن بذكركم جنوني",
        "author": "الشيخ محمد سعيد الكردي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "fainyakunbidhikrikum1",
        "source": ""
    },
    {
        "id": 15, 
        "qasidah": "لقد كنا قدما في ضيافة أحمد",
        "author": "الشيخ محمد سعيد الكردي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "laqadkunnaaqidman1",
        "source": ""
    },
    {
        "id": 16, 
        "qasidah": "الله قل وذر الوجود وما حوى",
        "author": "الشيخ أبو مدين الغوث",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "allahqul1",
        "source": ""
    },
    {
        "id": 17, 
        "qasidah": "أيها العاشق معنى حسننا",
        "author": "الشيخ عز الدين بن عبد السلام المقدسي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "ayyuhalashiq1",
        "source": ""
    },
    {
        "id": 18, 
        "qasidah": "أقدم يا معنى إن رمت الدوا",
        "author": "الشيخ أحمد بن مصطفى العلوي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "aqdimyama3na1",
        "source": ""
    },
    {
        "id": 19, 
        "qasidah": "عنت الأبصار",
        "author": "الشيخ أحمد بن مصطفى العلوي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "3anatalabsar1",
        "source": ""
    },
    {
        "id": 20, 
        "qasidah": "أيا مريد الله نعيد لك قولي اصغه",
        "author": "الشيخ أحمد بن مصطفى العلوي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "ayaamureed1",
        "source": ""
    },
    {
        "id": 21, 
        "qasidah": "دمعي مهطال برد الآصال سلم على طه",
        "author": "الشيخ أحمد بن مصطفى العلوي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "sallim3ala1",
        "source": ""
    },
    {
        "id": 22, 
        "qasidah": "روح وريحان ما بين الخلان",
        "author": "الشيخ أحمد بن مصطفى العلوي",
        "munshid": "الشيخ عبد الرحمن الشعار",
        "filename": "rohwarayhan1",
        "source": ""
    },
] 
export default audios