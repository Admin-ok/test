import urllib.request
import os
import codecs

os.makedirs('assets/cars', exist_ok=True)

images = {
    'dzire.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/2018_Maruti_Suzuki_Dzire_VXi.jpg/800px-2018_Maruti_Suzuki_Dzire_VXi.jpg',
    'aura.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Hyundai_Aura_S_%28India%29_front_view.jpg/800px-Hyundai_Aura_S_%28India%29_front_view.jpg',
    'amaze.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/2018_Honda_Amaze_%28India%29_front_view.jpg/800px-2018_Honda_Amaze_%28India%29_front_view.jpg',
    'ertiga.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/2019_Suzuki_Ertiga_GL_1.5_NCG39R_%2820190426%29.jpg/800px-2019_Suzuki_Ertiga_GL_1.5_NCG39R_%2820190426%29.jpg',
    'creta.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/2020_Hyundai_Creta_1.4_T-GDi_SX_%28O%29_%28India%29_front_view.png/800px-2020_Hyundai_Creta_1.4_T-GDi_SX_%28O%29_%28India%29_front_view.png',
    'seltos.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2021_Kia_Seltos_EX_1.6_front.jpg/800px-2021_Kia_Seltos_EX_1.6_front.jpg',
    'crysta.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Toyota_Innova_Crysta_2.4_V.jpg/800px-Toyota_Innova_Crysta_2.4_V.jpg',
    'hycross.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/2023_Toyota_Innova_Zenix_2.0_V_%28MAGH10R%29_front.jpg/800px-2023_Toyota_Innova_Zenix_2.0_V_%28MAGH10R%29_front.jpg',
    'xuv700.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mahindra_XUV700.jpg/800px-Mahindra_XUV700.jpg',
    'xl6.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Maruti_Suzuki_XL6_Alpha_%28India%29_front_view.jpg/800px-Maruti_Suzuki_XL6_Alpha_%28India%29_front_view.jpg',
    'carens.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/2022_Kia_Carens_1.4_T-GDi_Luxury_Plus.png/800px-2022_Kia_Carens_1.4_T-GDi_Luxury_Plus.png',
    'traveller.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Force_Traveller_in_Goa.jpg/800px-Force_Traveller_in_Goa.jpg',
    'volvo.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Volvo_B11R_bus_in_India.jpg/800px-Volvo_B11R_bus_in_India.jpg',
    'minibus.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Ashok_Leyland_Lynx_Smart_Bus.jpg/800px-Ashok_Leyland_Lynx_Smart_Bus.jpg'
}

req = urllib.request.Request
for name, url in images.items():
    try:
        path = f'assets/cars/{name}'
        if not os.path.exists(path):
            r = urllib.request.urlopen(req(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}))
            with open(path, 'wb') as f:
                f.write(r.read())
            print(f'Downloaded {name}')
    except Exception as e:
        print(f'Error downloading {name}: {e}')

try:
    with codecs.open('vehicles.html', 'r', 'latin1') as f:
        content = f.read()
    
    content = content.replace('â‚¹', '₹').replace('âœ“', '✓').replace('Ã¢â€šÂ¹', '₹').replace('Ã¢Å“â€œ', '✓')
    
    replacements = {
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Dzire/11993/1731317072520/front-left-side-47.jpg': 'assets/cars/dzire.jpg',
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Aura/10892/1674457788523/front-left-side-47.jpg': 'assets/cars/aura.jpg',
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Honda/Aura/10892/1674457788523/front-left-side-47.jpg': 'assets/cars/amaze.jpg',
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Ertiga/10293/1715065360699/front-left-side-47.jpg': 'assets/cars/ertiga.jpg',
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Creta/10940/1716382103433/front-left-side-47.jpg': 'assets/cars/creta.jpg',
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Kia/Seltos/10565/1689327891361/front-left-side-47.jpg': 'assets/cars/seltos.jpg',
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Innova-Crysta/10129/1683267597148/front-left-side-47.jpg': 'assets/cars/crysta.jpg',
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Innova-Hycross/11559/1703664724209/front-left-side-47.jpg': 'assets/cars/hycross.jpg',
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/XUV700/8559/1682604618712/front-left-side-47.jpg': 'assets/cars/xuv700.jpg',
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/XL6/11099/1705649987814/front-left-side-47.jpg': 'assets/cars/xl6.jpg',
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Kia/Carens/11494/1715671569438/front-left-side-47.jpg': 'assets/cars/carens.jpg',
        'https://truckcdn.cardekho.com/in/force/traveller-monobus/force-traveller-monobus.jpg': 'assets/cars/traveller.jpg',
        'https://truckcdn.cardekho.com/in/force/urbania/force-urbania-75896.jpg': 'assets/cars/minibus.jpg',
        'https://truckcdn.cardekho.com/in/ashok-leyland/lynx-smart/ashok-leyland-lynx-smart.jpg': 'assets/cars/minibus.jpg',
        'https://truckcdn.cardekho.com/in/volvo/9400-b11r/volvo-9400-b11r.jpg': 'assets/cars/volvo.jpg'
    }
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with codecs.open('vehicles.html', 'w', 'utf-8') as f:
        f.write(content)
    print('Successfully applied HTML fixes')
except Exception as e:
    print('Failed to write HTML: ', e)
