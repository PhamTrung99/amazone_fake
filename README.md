# AMAZONE FAKE
đồ án môn quản trị cơ sở dữ liệu hiện đại

# RUN
- Mở cmd, cd đến folder amazone_fake. 
- Nhập 'npm start'

## Các DB sử dụng trong đồ án:
- Neo4j: lưu trữ đối tượng comments .
- MongoDB: lưu trữ đối tượng products.
- Redis: lưu trữ đối tượng Card.

#NOTE:
- Cách dùng EJS [Link](https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application)

- Chú ý: Phải đặt tên collection trong DB mongo có thêm chữ 's' ở cuối. ví dụ: products
 VÌ npm moongose mặc định hiểu collection có chữ s ở cuối.(không có không query được)
