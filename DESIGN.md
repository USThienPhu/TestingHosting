# ĐẶC TẢ THIẾT KẾ GIAO DIỆN WEB (DESIGN.md)

## 1. Tổng quan Theme và Phong cách
trang web mang phong cách **Scrapbook / Handmade Diary (Sổ lưu niệm / Nhật ký thủ công)** rất sáng tạo, dễ thương và mang đậm tính cá nhân.

* **Theme chủ đạo:** Nghệ thuật, thủ công, vui nhộn (playful) và gần gũi.
* **Đặc trưng:** Sử dụng các element giả lập đời thực như băng keo dán (washi tape), viền giấy rách (torn paper), giấy kẻ ô (grid paper), tem thư, và các icon nét vẽ tay (doodle).

## 2. Chi tiết Thiết kế (Design Details)

### A. Bảng màu (Color Palette)
* **Màu nền chính (Background):** Vàng nhạt có họa tiết kẻ ô vuông nhỏ màu xanh lục/lam nhạt (giống trang vở ô ly).
* **Màu nhấn 1 (Primary Accent):** Xanh dương sáng (Bright Blue) - Dùng cho các mảng nền lớn, header, và các khối highlight.
* **Màu nhấn 2 (Secondary Accent):** Cam san hô (Coral/Orange) - Dùng cho tiêu đề, các nút bấm (buttons), text nhấn mạnh và thanh biểu đồ.
* **Màu phụ (Tertiary):** Xanh lá pastel nhạt - Dùng làm nền cho các thẻ tag/button.

### B. Nghệ thuật chữ (Typography)
* **Tiêu đề lớn (Headings):** Sử dụng các font chữ dạng bong bóng (bubble), vẽ tay (hand-drawn/marker) với viền outline dày hoặc hiệu ứng đổ bóng khối (block shadow) để tạo sự nổi bật, nghịch ngợm.
* **Nội dung (Body Text):** Sử dụng font chữ dạng máy đánh chữ (typewriter) hoặc monospace, sans-serif bo tròn nhẹ để tạo cảm giác retro, dễ đọc trên nền giấy ô ly.

### C. Các phần tử Đồ họa (Graphic Elements)
* **Khung ảnh:** Thiết kế giống chiếc tem thư (răng cưa ở viền) hoặc ảnh Polaroid dán bằng băng keo.
* **Icon:** Thiết kế dạng line-art nét vẽ tay bằng bút chì/bút lông, tô màu lệch viền (offset coloring).
* **Khối chia phần (Dividers):** Sử dụng hiệu ứng mảng màu nước hoặc mép giấy xé thủ công để chuyển đổi giữa các section (ví dụ: mép rách chuyển từ nền vàng sang nền xanh ở nửa dưới hình ảnh).

## 3. Cấu trúc Trang web Hình ảnh Đề xuất

Dựa trên yêu cầu của bạn (một trang web cơ bản để xem và tương tác hình ảnh), đây là cấu trúc UI/UX được "mapping" theo theme trên:

### Section 1: Hero Banner (Phần đầu trang)
* **Background:** Nền mảng màu xanh dương với viền giấy xé ở mép dưới, điểm xuyết bằng các cờ dây (bunting flags) treo ở góc trên.
* **Content:** Tiêu đề trang web (vd: "My Gallery", "Illustration Portfolio") viết bằng font chữ bong bóng màu trắng/vàng. Xung quanh là các hình vẽ doodle trang trí (máy ảnh, ngôi sao, bảng màu...).

### Section 2: Image Gallery (Khu vực chính: Lọc và Xem ảnh)
* **Background:** Nền vàng kẻ ô ly vở.
* **Thanh phân loại (Filter/Tags):** Lấy cảm hứng từ phần các nút ở cuối hình (Typography, Packaging...).
    * Thiết kế dạng các nút bấm hình viên thuốc (pill-shape).
    * Nền xanh lá pastel, chữ màu cam, viền ngoài bo tròn nhẹ.
    * Chức năng: Cho phép người dùng bấm vào để lọc hình ảnh theo chủ đề (Ví dụ: Tất cả, Tranh vẽ, Đồ họa, Chụp ảnh).
* **Lưới hình ảnh (Image Grid):**
    * Hiển thị các hình ảnh theo dạng lưới (Grid) hoặc Masonry.
    * *Card Design:* Mỗi hình ảnh (thumbnail) sẽ được bao quanh bởi một khung viền trắng nhỏ và có một miếng "băng keo dán" (washi tape) giả lập đè chéo ở góc trên, tạo cảm giác ảnh được đính lên sổ.
    * *Tương tác (Hover):* Khi đưa chuột vào, ảnh có thể hơi nghiêng đi, phóng to nhẹ (scale lên 1.05) hoặc đổ bóng đậm hơn để kích thích tương tác.

### Section 3: Lightbox / Image Viewer (Trình xem ảnh toàn màn hình)
* **Tương tác (Click):** Khi người dùng click vào một bức ảnh trong lưới, nó sẽ mở ra một popup/modal (Lightbox).
* **UI của Lightbox:**
    * Màn hình nền phía sau tối lại hoặc mờ đi (overlay).
    * Bức ảnh hiển thị ở kích thước lớn ở chính giữa.
    * Có nút `X` (đóng) góc trên cùng bên phải thiết kế dạng nét vẽ tay.
    * Có nút mũi tên `<` và `>` hai bên cạnh để lướt xem các ảnh trước/sau trong bộ sưu tập.

### Section 4: Footer (Chân trang)
* **Giao diện:** Đơn giản với một đường kẻ đứt nét ngang chia cách.
* **Nội dung:** Thông tin liên hệ đặt cạnh các icon vẽ tay (Email, Github, Behance), tương tự như phần "Contact" trong ảnh mẫu.
