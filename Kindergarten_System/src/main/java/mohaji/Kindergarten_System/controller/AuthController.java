//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.*;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//import mohaji.Kindergarten_System.entity.User;
//import mohaji.Kindergarten_System.repository.UserRepository;
////import mohaji.Kindergarten_System.payload.LoginRequest;
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:5173")
//public class AuthController {
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;
//
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody User user) {
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        User saved = userService.createUser(user);
//        return ResponseEntity.ok(saved);
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
//        User user = userService.findByUsername(loginRequest.getUsername());
//
//        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
//        }
//
//        return ResponseEntity.ok(user);
//    }
//}
