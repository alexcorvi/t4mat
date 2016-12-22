export default function (obj){
	// normalize
	// A. Normalize object => variables
	var t1 = obj.t1 || obj.time1 || obj.t || obj.time;
	var t2 = obj.t2 || obj.time2;

	// B. Normalize those variables to ms
	t1 = normalizeT(t1);
	t2 = normalizeT(t2);

	function normalizeT(t){
		if(typeof t === "string" || typeof t === "number") t = new Date(t).getTime();
		else if (typeof t === "object" && t !== null) t = t.getTime();
		else t = new Date().getTime();
		return t;
	}

	return {
		t1:t1,
		t2:t2,
		format:typeof obj.format === "string" ? obj.format : "{R}",
	}
}