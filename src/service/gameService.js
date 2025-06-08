//kéo api danh sách tất cả game, dùng 1 biến để nhận result là có thể truy cập đc các thuộc tính trong json
export async function fetchAllGame ()  {
    // lấy dữ liệu từ api về
    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9baa2ab8d4mshb5a5b57bc6bbae6p1274dejsna95b7ac989c5',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json(); // chuyển api thành file json  
        return result;
    } catch (error) {
        console.error(error);

    }
}
//kéo api theo nền tảng game: pc, browser, all
export async function fetchGameByPlatform (platform)  {
    // lấy dữ liệu từ api về
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`;
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '9baa2ab8d4mshb5a5b57bc6bbae6p1274dejsna95b7ac989c5',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
    if (!response.ok) {
        console.warn(`API trả về rỗng: ${response.status} ${response.statusText}`);
        return []; // trả về mảng rỗng nếu lỗi
    }
	const result = await response.json();
    return result;
} catch (error) {
	console.error(error);

}
}
//kéo api theo tag: mmorpg, shooter, pvp, mmofps,moba, racing, sports, social,survival
export async function fetchGameByCategoryTag(cTag){
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cTag}`;
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '9baa2ab8d4mshb5a5b57bc6bbae6p1274dejsna95b7ac989c5',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
    if (!response.ok) {
        console.warn(`API trả về rỗng: ${response.status} ${response.statusText}`);
        return []; // trả về mảng rỗng nếu lỗi
    }
	const result = await response.json();
    return result;
} catch (error) {
	console.error(error);

}
}
//kéo api theo 1 id cụ thể
export async function fetchGameById(id){
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '9baa2ab8d4mshb5a5b57bc6bbae6p1274dejsna95b7ac989c5',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	return result;
} catch (error) {
	console.error(error);
}
}