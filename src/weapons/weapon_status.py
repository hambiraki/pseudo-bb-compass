model_to_series = {
    "索敵センサー": "sensor",
    "小型索敵センサー": "sensor",
    "広域索敵センサー": "sensor",
    "新型索敵センサー": "sensor",
    "ND索敵センサー": "nd_sensor",
    "小型ND索敵センサー": "nd_sensor",
    "広域ND索敵センサー": "nd_sensor",
    "BRトラッカー": "br_tracker",
    "集中型BRトラッカー": "br_tracker",
    "広域型BRトラッカー": "br_tracker",
    "滞空索敵弾": "balloon",
    "小型滞空索敵弾": "balloon",
    "広域滞空索敵弾": "balloon",
    "高機能滞空索敵弾": "balloon",
    "Vセンサー投射器": "v_sensor_a",
    "小型Vセンサー投射器": "v_sensor_a",
    "広域Vセンサー投射器": "v_sensor_a",
    "H-Vセンサー投射器": "v_sensor_a",
    "Vセンサー投射器": "v_sensor_b",
    "小型Vセンサー投射器": "v_sensor_b",
    "広域Vセンサー投射器": "v_sensor_b",
    "H-Vセンサー投射器": "v_sensor_b",
    "ラーク偵察機": "scoutor",
    "ファルコン偵察機": "scoutor",
    "ストーク偵察機": "scoutor",
    "アウル偵察機": "scoutor",
    "ロビン偵察機": "scoutor",
    "カナリア偵察機": "scoutor",
    "マグ": "scoutor",
    "クリアリングソナー": "sonar",
    "クリアリングソナーM": "sonar",
    "クリアリングソナーW": "sonar",
    "レーダーユニット": "rader",
    "レーダーユニットⅡ": "rader",
    "レーダーユニットⅢ": "rader",
    "偵察要請装置": "bolt_on_unit",
    "FJ－アジテーター": "agitator",
    "FJ－アジテーターC": "agitator",
    "FJ－ジャバウォック": "agitator",
}

series_name = {
    "sensor": "索敵センサー",
    "nd_sensor": "ND索敵センサー",
    "br_tracker": "BRトラッカー",
    "balloon": "滞空索敵弾",
    "v_sensor_a": "Vセンサー投射器A",
    "v_sensor_b": "Vセンサー投射器B",
    "scoutor": "偵察機",
    "sonar": "クリアリングソナー",
    "rader": "レーダーユニット",
    "bolt_on_unit": "要請兵器",
    "agitator": "FJ－アジテーター",
}

sensor_status = {
    "索敵センサー": [70],
    "小型索敵センサー": [65],
    "広域索敵センサー": [125],
    "新型索敵センサー": [88],
}
nd_sensor_status = {
    "ND索敵センサー": [173],
    "小型ND索敵センサー": [153],
    "広域ND索敵センサー": [286],
}
br_tracker_status = {
    "BRトラッカー": [162, 90, 1.65, 3, 2],
    "集中型BRトラッカー": [142, 120, 2.05, 2, 2],
    "広域型BRトラッカー": [198, 150, 1.67, 6, 2],
}
balloon_status = {
    "滞空索敵弾": [76, 50],
    "小型滞空索敵弾": [65, 60],
    "広域滞空索敵弾": [98, 65],
    "高機能滞空索敵弾": [138, 85],
}
v_sensor_a_status = {
    "Vセンサー投射器": [65],
    "小型Vセンサー投射器": [55],
    "広域Vセンサー投射器": [110],
    "H-Vセンサー投射器": [100],
}
v_sensor_b_status = {
    "Vセンサー投射器": [162, 12],
    "小型Vセンサー投射器": [142, 9],
    "広域Vセンサー投射器": [242, 33],
    "H-Vセンサー投射器": [233, 45],
}
scoutor_status = {
    "ラーク偵察機": [119, 28, 250],
    "ファルコン偵察機": [103, 50, 500],
    "ストーク偵察機": [113, 2.6, 50],
    "アウル偵察機": [142, 14, 220],
    "ロビン偵察機": [220, 20, 150],
    "カナリア偵察機": [266, 25, 80],
    "マグ": [176, 16, 180],
}
sonar_status = {
    "クリアリングソナー": [184],
    "クリアリングソナーM": [174],
    "クリアリングソナーW": [242],
}
rader_status = {
    "レーダーユニット": [259, 60, 1.67],
    "レーダーユニットⅡ": [229, 120, 1.79],
    "レーダーユニットⅢ": [209, 360, 1.77],
}
bolt_on_unit_status = {
    "偵察要請装置": [500, 1200, 1200],
}
agitator_status = {
    "FJ－アジテーター": [37.8, 8.6],
    "FJ－アジテーターC": [32.7, 9.8],
    "FJ－ジャバウォック": [44, 14.3],
}

statuses = {
    "sensor": [["mRadius"], sensor_status],
    "nd_sensor": [["mRadius"], nd_sensor_status],
    "br_tracker": [
        ["mRadius", "degCenter", "sToFull", "sRetention", "sPause"],
        br_tracker_status,
    ],
    "balloon": [["mRadius", "sLifetime"], balloon_status],
    "v_sensor_a": [["mRadius"], v_sensor_a_status],
    "v_sensor_b": [["mRadius", "sLifetime"], v_sensor_b_status],
    "scoutor": [["mRadius", "mpsSpeed", "mDistance"], scoutor_status],
    "sonar": [["mRadius"], sonar_status],
    "rader": [["mRadius", "degCenter", "sToFull"], rader_status],
    "bolt_on_unit": [["mRadius", "mpsSpeed", "mDistance"], bolt_on_unit_status],
    "agitator": [["mRadius", "sLifetime"], agitator_status],
}
